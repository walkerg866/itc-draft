import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // One-shot function; deleted immediately after invocation.


    // List and delete all objects, then remove bucket
    const all: string[] = [];
    let offset = 0;
    while (true) {
      const { data, error } = await supabase.storage
        .from("notification-pdfs")
        .list("", { limit: 1000, offset });
      if (error) throw error;
      if (!data || data.length === 0) break;
      all.push(...data.map((f) => f.name));
      if (data.length < 1000) break;
      offset += 1000;
    }

    if (all.length > 0) {
      const { error: delErr } = await supabase.storage.from("notification-pdfs").remove(all);
      if (delErr) throw delErr;
    }

    const { error: bucketErr } = await supabase.storage.deleteBucket("notification-pdfs");
    if (bucketErr) throw bucketErr;

    return new Response(JSON.stringify({ success: true, deletedFiles: all.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("cleanup error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
