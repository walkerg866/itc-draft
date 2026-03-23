import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminUser {
  id: string;
  email: string;
  notify_job_applications: boolean;
  notify_quote_requests: boolean;
}

const NotificationSettings = () => {
  const { isSuperAdmin } = useUserRole();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Get all admin users via the edge function
      const { data: rolesData } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (!rolesData || rolesData.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      // Get notification preferences
      const { data: prefsData } = await supabase
        .from("notification_preferences")
        .select("*");

      // Get user emails via manage-admin-users edge function
      const { data: adminData } = await supabase.functions.invoke("manage-admin-users", {
        body: { action: "list" },
      });

      const adminUsers = adminData?.users || [];
      const prefsMap = new Map(
        (prefsData || []).map((p: any) => [p.user_id, p])
      );

      const merged: AdminUser[] = adminUsers.map((u: any) => {
        const pref = prefsMap.get(u.id);
        return {
          id: u.id,
          email: u.email,
          notify_job_applications: pref?.notify_job_applications ?? false,
          notify_quote_requests: pref?.notify_quote_requests ?? false,
        };
      });

      setUsers(merged);
    } catch (err: any) {
      toast.error("Failed to load notification settings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePreference = async (
    userId: string,
    field: "notify_job_applications" | "notify_quote_requests",
    value: boolean
  ) => {
    if (!isSuperAdmin) {
      toast.error("Only super admins can change notification settings");
      return;
    }

    setUpdating(`${userId}-${field}`);
    try {
      // Upsert the preference
      const { error } = await supabase
        .from("notification_preferences")
        .upsert(
          {
            user_id: userId,
            [field]: value,
          },
          { onConflict: "user_id" }
        );

      if (error) throw error;

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, [field]: value } : u
        )
      );
      toast.success("Notification preference updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update preference");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold mb-2">Notification Settings</h1>
      <p className="text-muted-foreground mb-8">
        Configure which admin users receive email notifications when new job applications or quote requests are submitted.
      </p>

      {!isSuperAdmin && (
        <div className="bg-muted rounded-lg p-4 mb-6 text-sm text-muted-foreground">
          Only super admins can modify notification settings. You can view current settings below.
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 text-sm font-medium">User</th>
              <th className="text-center px-4 py-3 text-sm font-medium">Job Applications</th>
              <th className="text-center px-4 py-3 text-sm font-medium">Quote Requests</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                  No admin users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={user.notify_job_applications}
                        onCheckedChange={(val) =>
                          togglePreference(user.id, "notify_job_applications", val)
                        }
                        disabled={!isSuperAdmin || updating === `${user.id}-notify_job_applications`}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={user.notify_quote_requests}
                        onCheckedChange={(val) =>
                          togglePreference(user.id, "notify_quote_requests", val)
                        }
                        disabled={!isSuperAdmin || updating === `${user.id}-notify_quote_requests`}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Notifications include a brief summary and a PDF download link (valid for 7 days) so recipients don't need to log in.
      </p>
    </div>
  );
};

export default NotificationSettings;
