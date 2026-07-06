import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const adminClient = createClient(supabaseUrl, serviceRoleKey);

  // Verify caller is authenticated
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const anonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;
  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: { user: caller }, error: authError } = await userClient.auth.getUser();
  if (authError || !caller) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Helper: check caller role
  const { data: callerRoles } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", caller.id);

  const callerIsSuperAdmin = callerRoles?.some((r: any) => r.role === "super_admin") ?? false;

  try {
    if (req.method === "GET") {
      if (!callerIsSuperAdmin) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // List all users with roles
      const { data: roles, error: rolesErr } = await adminClient
        .from("user_roles")
        .select("user_id, role, created_at");

      if (rolesErr) throw rolesErr;

      // Single batched call: fetch all auth users, then join by id in-memory
      const emailById = new Map<string, string | undefined>();
      for (let page = 1; page <= 20; page++) {
        const { data: list, error: listErr } = await adminClient.auth.admin.listUsers({
          page,
          perPage: 200,
        });
        if (listErr) throw listErr;
        for (const u of list?.users ?? []) emailById.set(u.id, u.email ?? undefined);
        if (!list?.users?.length || list.users.length < 200) break;
      }

      const users = (roles ?? [])
        .filter((r: any) => emailById.has(r.user_id))
        .map((r: any) => ({
          id: r.user_id,
          email: emailById.get(r.user_id),
          role: r.role,
          created_at: r.created_at,
        }));

      return new Response(JSON.stringify(users), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    if (req.method === "POST") {
      const body = await req.json();
      const { action } = body;

      if (action === "create") {
        const { email, password, role } = body;
        if (!email || !password || !role) {
          return new Response(JSON.stringify({ error: "email, password, and role required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Bootstrap: if no roles exist at all, first user becomes super_admin
        const { count } = await adminClient
          .from("user_roles")
          .select("id", { count: "exact", head: true });

        const isBootstrap = (count ?? 0) === 0;

        if (!isBootstrap && !callerIsSuperAdmin) {
          return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Pre-check: does an auth user with this email already exist?
        const normalizedEmail = String(email).trim().toLowerCase();
        let existingAuthUserId: string | null = null;
        try {
          // Paginate through users looking for a matching email (admin.listUsers has no email filter)
          for (let page = 1; page <= 20; page++) {
            const { data: list, error: listErr } = await adminClient.auth.admin.listUsers({
              page,
              perPage: 200,
            });
            if (listErr) break;
            const match = list?.users?.find(
              (u: any) => (u.email ?? "").toLowerCase() === normalizedEmail,
            );
            if (match) {
              existingAuthUserId = match.id;
              break;
            }
            if (!list?.users?.length || list.users.length < 200) break;
          }
        } catch (_) {
          // fall through to createUser and let it surface any error
        }

        if (existingAuthUserId) {
          // If they already have a role, it's a true duplicate. Otherwise, attach the requested role.
          const { data: existingRoles } = await adminClient
            .from("user_roles")
            .select("role")
            .eq("user_id", existingAuthUserId);

          if (existingRoles && existingRoles.length > 0) {
            return new Response(
              JSON.stringify({
                error: `${email} is already an admin user. Delete the existing account first if you want to recreate it.`,
              }),
              {
                status: 409,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              },
            );
          }

          const { error: attachErr } = await adminClient
            .from("user_roles")
            .insert({ user_id: existingAuthUserId, role });

          if (attachErr) {
            return new Response(JSON.stringify({ error: attachErr.message }), {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }

          return new Response(
            JSON.stringify({ id: existingAuthUserId, email, role, attached: true }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }

        // Create user
        const { data: newUser, error: createErr } = await adminClient.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

        if (createErr) {
          const msg = createErr.message || "";
          const friendly = /already been registered|already exists/i.test(msg)
            ? `${email} is already registered. Delete the existing account first if you want to recreate it.`
            : msg;
          return new Response(JSON.stringify({ error: friendly }), {
            status: /already/i.test(msg) ? 409 : 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Insert role using admin client (bypasses RLS)
        const { error: roleErr } = await adminClient
          .from("user_roles")
          .insert({ user_id: newUser.user.id, role });

        if (roleErr) {
          // Rollback user creation
          await adminClient.auth.admin.deleteUser(newUser.user.id);
          return new Response(JSON.stringify({ error: roleErr.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ id: newUser.user.id, email, role }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (action === "delete") {
        const { userId } = body;
        if (!userId) {
          return new Response(JSON.stringify({ error: "userId required" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Super admins can delete anyone; others can only delete themselves
        if (!callerIsSuperAdmin && userId !== caller.id) {
          return new Response(JSON.stringify({ error: "You can only delete your own account" }), {
            status: 403,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Delete role first, then user
        await adminClient.from("user_roles").delete().eq("user_id", userId);
        const { error: delErr } = await adminClient.auth.admin.deleteUser(userId);

        if (delErr) {
          return new Response(JSON.stringify({ error: delErr.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (action === "bootstrap") {
        // If no roles exist, assign the caller as super_admin
        const { count } = await adminClient
          .from("user_roles")
          .select("id", { count: "exact", head: true });

        if ((count ?? 0) > 0) {
          return new Response(JSON.stringify({ error: "Roles already exist" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const { error: insertErr } = await adminClient
          .from("user_roles")
          .insert({ user_id: caller.id, role: "super_admin" });

        if (insertErr) throw insertErr;

        return new Response(JSON.stringify({ success: true, role: "super_admin" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Unknown action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
