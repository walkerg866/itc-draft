import { supabase } from "@/integrations/supabase/client";

/**
 * Shared helper for calling the `manage-admin-users` edge function.
 * Attaches the current session's access token + apikey. Throws with
 * a descriptive message on non-2xx responses.
 */
export async function callAdminEdge<T = unknown>(
  method: "GET" | "POST",
  body?: unknown,
): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession();
  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-admin-users`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token ?? ""}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string })?.error || "Request failed");
  return data as T;
}
