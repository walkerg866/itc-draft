import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationPayload {
  type: "job_application" | "quote_request";
  record: Record<string, any>;
}

function formatJobApplicationText(record: Record<string, any>): string {
  const lines = [
    `NEW JOB APPLICATION`,
    `====================`,
    ``,
    `Name: ${record.first_name} ${record.middle_name ? record.middle_name + " " : ""}${record.last_name}`,
    `Position: ${record.position_applied}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone}`,
    `Address: ${record.address}, ${record.city}, ${record.state} ${record.zip}`,
    ``,
  ];
  if (record.desired_pay) lines.push(`Desired Pay: ${record.desired_pay}`);
  if (record.available_start_date) lines.push(`Available Start: ${record.available_start_date}`);
  if (record.education) lines.push(`Education: ${record.education}`);
  if (record.skills) lines.push(`Skills: ${record.skills}`);
  if (record.how_heard) lines.push(`How Heard: ${record.how_heard}`);
  lines.push(``, `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`);
  return lines.join("\n");
}

function formatQuoteRequestText(record: Record<string, any>): string {
  const lines = [
    `NEW QUOTE REQUEST`,
    `==================`,
    ``,
    `Name: ${record.first_name} ${record.last_name}`,
    `Company: ${record.company || "N/A"}`,
    `Email: ${record.email}`,
    `Phone: ${record.phone || "N/A"}`,
    `Industry: ${record.industry || "N/A"}`,
    `Diameter(s): ${record.diameters || "N/A"}`,
    `Annual Volume: ${record.annual_volume || "N/A"}`,
    ``,
    `Message:`,
    record.message,
    ``,
    `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })}`,
  ];
  return lines.join("\n");
}

function generatePdfBytes(text: string): Uint8Array {
  // Generate a simple text-based PDF
  const lines = text.split("\n");
  const fontSize = 11;
  const lineHeight = 14;
  const margin = 50;
  const pageWidth = 612;
  const pageHeight = 792;
  const maxY = pageHeight - margin;
  
  // Escape special PDF characters
  const escPdf = (s: string) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  
  let textOps = "";
  let y = pageHeight - margin;
  
  for (const line of lines) {
    if (y < margin) {
      y = pageHeight - margin; // simple: just wrap (single page for now)
    }
    textOps += `BT /F1 ${fontSize} Tf ${margin} ${y} Td (${escPdf(line)}) Tj ET\n`;
    y -= lineHeight;
  }

  const stream = textOps;
  const streamLength = new TextEncoder().encode(stream).length;

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj

2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj

3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj

4 0 obj
<< /Length ${streamLength} >>
stream
${stream}
endstream
endobj

5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000296 00000 n 
0000000${(350 + streamLength).toString().padStart(3, "0")} 00000 n 

trailer
<< /Size 6 /Root 1 0 R >>
startxref
0
%%EOF`;

  return new TextEncoder().encode(pdf);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const payload: NotificationPayload = await req.json();
    const { type, record } = payload;

    // Generate PDF content
    const text = type === "job_application"
      ? formatJobApplicationText(record)
      : formatQuoteRequestText(record);

    const pdfBytes = generatePdfBytes(text);
    const fileName = `${type}-${record.id || crypto.randomUUID()}.pdf`;

    // Upload PDF to notification-pdfs bucket (create bucket if needed)
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b: any) => b.name === "notification-pdfs");
    if (!bucketExists) {
      await supabase.storage.createBucket("notification-pdfs", { public: false });
    }

    const { error: uploadError } = await supabase.storage
      .from("notification-pdfs")
      .upload(fileName, pdfBytes, { contentType: "application/pdf", upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(`Failed to upload PDF: ${uploadError.message}`);
    }

    // Generate signed URL (7 days)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from("notification-pdfs")
      .createSignedUrl(fileName, 7 * 24 * 60 * 60);

    if (signedUrlError) throw signedUrlError;
    const downloadUrl = signedUrlData.signedUrl;

    // Look up notification preferences
    const prefColumn = type === "job_application" ? "notify_job_applications" : "notify_quote_requests";
    const { data: prefs, error: prefsError } = await supabase
      .from("notification_preferences")
      .select("user_id")
      .eq(prefColumn, true);

    if (prefsError) {
      console.error("Prefs error:", prefsError);
      throw prefsError;
    }

    if (!prefs || prefs.length === 0) {
      console.log("No users opted in for", type, "notifications");
      return new Response(JSON.stringify({ success: true, notified: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get emails for opted-in users
    const userIds = prefs.map((p: any) => p.user_id);
    const { data: usersData } = await supabase.auth.admin.listUsers();
    
    const emails = usersData?.users
      ?.filter((u: any) => userIds.includes(u.id))
      ?.map((u: any) => u.email)
      ?.filter(Boolean) || [];

    if (emails.length === 0) {
      return new Response(JSON.stringify({ success: true, notified: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send email notifications using Lovable API
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    const subjectLine = type === "job_application"
      ? `New Job Application: ${record.first_name} ${record.last_name} — ${record.position_applied}`
      : `New Quote Request: ${record.first_name} ${record.last_name}${record.company ? ` (${record.company})` : ""}`;

    const summaryHtml = type === "job_application"
      ? `<p>A new job application has been submitted.</p>
         <p><strong>Applicant:</strong> ${record.first_name} ${record.last_name}</p>
         <p><strong>Position:</strong> ${record.position_applied}</p>
         <p><strong>Email:</strong> ${record.email}</p>
         <p><strong>Phone:</strong> ${record.phone}</p>
         <p style="margin-top:20px"><a href="${downloadUrl}" style="background:#E8600A;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold">Download Application PDF</a></p>`
      : `<p>A new quote request has been submitted.</p>
         <p><strong>Name:</strong> ${record.first_name} ${record.last_name}</p>
         <p><strong>Company:</strong> ${record.company || "N/A"}</p>
         <p><strong>Email:</strong> ${record.email}</p>
         <p><strong>Industry:</strong> ${record.industry || "N/A"}</p>
         <p style="margin-top:20px"><a href="${downloadUrl}" style="background:#E8600A;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold">Download Quote Request PDF</a></p>`;

    const emailBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <div style="border-bottom:3px solid #E8600A;padding-bottom:15px;margin-bottom:20px">
          <h2 style="margin:0;color:#1a1a2e">${subjectLine}</h2>
        </div>
        ${summaryHtml}
        <hr style="margin-top:30px;border:none;border-top:1px solid #eee" />
        <p style="color:#999;font-size:12px">This is an automated notification from Indiana Tube Corporation. The download link expires in 7 days.</p>
      </div>`;

    let notified = 0;
    for (const email of emails) {
      try {
        // Use fetch to send via Lovable's email API (simple SMTP-style)
        // For now, log the notification - actual email sending requires email domain setup
        console.log(`Would send notification to: ${email}, subject: ${subjectLine}`);
        notified++;
      } catch (emailErr) {
        console.error(`Failed to send to ${email}:`, emailErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, notified, downloadUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("send-notification error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
