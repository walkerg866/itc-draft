import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify the caller is a super admin
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: isSuper } = await admin.rpc("has_role", {
      _user_id: userData.user.id, _role: "super_admin",
    });
    if (!isSuper) {
      return new Response(JSON.stringify({ error: "Forbidden — super admin only" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Collect all configured recipients (regardless of toggle state — this is a test)
    const { data: prefs } = await admin
      .from("notification_preferences")
      .select("email, user_id");

    const directEmails = (prefs || []).filter((p: any) => p.email).map((p: any) => p.email);
    const legacyIds = (prefs || [])
      .filter((p: any) => !p.email && p.user_id !== "00000000-0000-0000-0000-000000000000")
      .map((p: any) => p.user_id);

    let authEmails: string[] = [];
    if (legacyIds.length > 0) {
      const { data: usersData } = await admin.auth.admin.listUsers();
      authEmails = usersData?.users
        ?.filter((u: any) => legacyIds.includes(u.id))
        ?.map((u: any) => u.email)
        ?.filter(Boolean) || [];
    }

    const emails = [...new Set([...directEmails, ...authEmails])];
    if (emails.length === 0) {
      return new Response(JSON.stringify({ error: "No recipients configured" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const triggeredBy = userData.user.email || "an admin";
    const subjectLine = "Test Alert — Indiana Tube Notifications";
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <div style="border-bottom:3px solid #E8600A;padding-bottom:15px;margin-bottom:20px">
          <h2 style="margin:0;color:#1a1a2e">✅ Test Alert</h2>
        </div>
        <p>This is a test notification from the Indiana Tube admin panel to confirm that email delivery is working.</p>
        <p><strong>Triggered by:</strong> ${triggeredBy}</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET</p>
        <p style="margin-top:20px;color:#555">If you received this, real notifications for new job applications and quote requests will arrive at this address.</p>
        <hr style="margin-top:30px;border:none;border-top:1px solid #eee" />
        <p style="color:#999;font-size:12px">Automated test message from Indiana Tube Corporation.</p>
      </div>`;

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
            subject: subjectLine,
            html,
          }),
        });
        if (!res.ok) {
          const errText = await res.text();
          failed++;
          failures.push({ email, error: `${res.status}: ${errText}` });
          console.error(`Resend failed for ${email} [${res.status}]: ${errText}`);
        } else {
          notified++;
        }
      } catch (e: any) {
        failed++;
        failures.push({ email, error: e?.message || "unknown" });
      }
    }

    return new Response(
      JSON.stringify({ success: true, notified, failed, failures, recipients: emails }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("send-test-notification error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
