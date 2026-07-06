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

// HTML-encode user-controlled values to prevent injection
const escHtml = (s: unknown): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Validate webhook secret by reading expected value from Vault
    const { data: vaultRow, error: vaultErr } = await supabase.rpc("get_webhook_secret");
    const expectedSecret = vaultRow;
    const providedSecret = req.headers.get("x-webhook-secret");

    if (vaultErr || !expectedSecret || providedSecret !== expectedSecret) {
      console.error("Unauthorized: invalid or missing webhook secret", vaultErr?.message);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload: NotificationPayload = await req.json();
    const { type, record } = payload;

    const fileId = record.id || crypto.randomUUID();



    // Build admin panel link on the live site (never expires, auth-gated,
    // downloads via blob so no third-party host is flagged).
    const siteUrl = Deno.env.get("PUBLIC_SITE_URL") || "https://indianatube.com";
    const adminPath = type === "job_application"
      ? `/admin/dashboard/applications?open=${encodeURIComponent(fileId)}`
      : `/admin/dashboard/quotes?open=${encodeURIComponent(fileId)}`;
    const adminUrl = `${siteUrl}${adminPath}`;

    // Look up notification preferences
    const prefColumn = type === "job_application" ? "notify_job_applications" : "notify_quote_requests";
    const { data: prefs, error: prefsError } = await supabase
      .from("notification_preferences")
      .select("email, user_id")
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

    const directEmails = prefs.filter((p: any) => p.email).map((p: any) => p.email);
    const legacyUserIds = prefs.filter((p: any) => !p.email && p.user_id !== "00000000-0000-0000-0000-000000000000").map((p: any) => p.user_id);
    
    let authEmails: string[] = [];
    if (legacyUserIds.length > 0) {
      const { data: usersData } = await supabase.auth.admin.listUsers();
      authEmails = usersData?.users
        ?.filter((u: any) => legacyUserIds.includes(u.id))
        ?.map((u: any) => u.email)
        ?.filter(Boolean) || [];
    }

    const emails = [...new Set([...directEmails, ...authEmails])];

    if (emails.length === 0) {
      return new Response(JSON.stringify({ success: true, notified: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const subjectLine = type === "job_application"
      ? `New Job Application: ${record.first_name} ${record.last_name} — ${record.position_applied}`
      : `New Quote Request: ${record.first_name} ${record.last_name}${record.company ? ` (${record.company})` : ""}`;

    const btnPrimary = "display:inline-block;background:#E8600A;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:bold";

    const summaryHtml = type === "job_application"
      ? `<p>A new job application has been submitted.</p>
         <p><strong>Applicant:</strong> ${escHtml(record.first_name)} ${escHtml(record.last_name)}</p>
         <p><strong>Position:</strong> ${escHtml(record.position_applied)}</p>
         <p><strong>Email:</strong> ${escHtml(record.email)}</p>
         <p><strong>Phone:</strong> ${escHtml(record.phone)}</p>
         <p style="margin-top:20px">
           <a href="${adminUrl}" style="${btnPrimary}">View Application</a>
         </p>`
      : `<p>A new quote request has been submitted.</p>
         <p><strong>Name:</strong> ${escHtml(record.first_name)} ${escHtml(record.last_name)}</p>
         <p><strong>Company:</strong> ${escHtml(record.company) || "N/A"}</p>
         <p><strong>Email:</strong> ${escHtml(record.email)}</p>
         <p><strong>Industry:</strong> ${escHtml(record.industry) || "N/A"}</p>
         <p style="margin-top:20px">
           <a href="${adminUrl}" style="${btnPrimary}">View Quote Request</a>
         </p>`;

    const emailBody = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <div style="border-bottom:3px solid #E8600A;padding-bottom:15px;margin-bottom:20px">
          <h2 style="margin:0;color:#1a1a2e">${escHtml(subjectLine)}</h2>
        </div>
        ${summaryHtml}
        <hr style="margin-top:30px;border:none;border-top:1px solid #eee" />
        <p style="color:#999;font-size:12px">This is an automated notification from Indiana Tube Corporation. Sign in to the admin panel to view the full submission.</p>
      </div>`;


    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const replyTo = record.email || undefined;
    let notified = 0;
    let failed = 0;
    const failures: Array<{ email: string; error: string }> = [];

    for (const email of emails) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Indiana Tube Notifications <notification@indianatube.com>",
            to: [email],
            reply_to: replyTo,
            subject: subjectLine,
            html: emailBody,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error(`Resend failed for ${email} [${res.status}]: ${errText}`);
          failed++;
          failures.push({ email, error: `${res.status}: ${errText}` });
        } else {
          notified++;
        }
      } catch (emailErr: any) {
        console.error(`Failed to send to ${email}:`, emailErr);
        failed++;
        failures.push({ email, error: emailErr?.message || "unknown" });
      }
    }

    return new Response(
      JSON.stringify({ success: true, notified, failed, failures, adminUrl }),
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
