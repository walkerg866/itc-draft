import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import { callAdminEdge } from "@/lib/adminApi";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, Send } from "lucide-react";
import { toast } from "sonner";

interface Recipient {
  id: string;
  email: string;
  notify_job_applications: boolean;
  notify_quote_requests: boolean;
  is_admin: boolean;
}

const NotificationSettings = () => {
  const { isSuperAdmin } = useUserRole();
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);

  const sendTestAlert = async () => {
    setSendingTest(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-test-notification");
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      const { notified = 0, failed = 0, recipients = [] } = data || {};
      if (failed > 0) {
        toast.error(`Sent to ${notified}, failed ${failed}. Check edge function logs.`);
      } else {
        toast.success(`Test alert sent to ${notified} recipient${notified === 1 ? "" : "s"}: ${recipients.join(", ")}`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to send test alert");
    } finally {
      setSendingTest(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Get notification preferences (these may include non-admin users)
      const { data: prefsData } = await supabase
        .from("notification_preferences")
        .select("*");

      // Get admin user emails for labeling
      const { data: { session } } = await supabase.auth.getSession();
      const adminData = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-admin-users`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        }
      ).then((response) => response.json());

      const adminUsers = Array.isArray(adminData) ? adminData : [];
      const adminMap = new Map(adminUsers.map((u: any) => [u.id, u.email]));

      // Build recipients from preferences
      const merged: Recipient[] = (prefsData || []).map((p: any) => ({
        id: p.id,
        email: p.email || adminMap.get(p.user_id) || "Unknown",
        notify_job_applications: p.notify_job_applications,
        notify_quote_requests: p.notify_quote_requests,
        is_admin: adminMap.has(p.user_id),
      }));

      setRecipients(merged);
    } catch (err: any) {
      toast.error("Failed to load notification settings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const togglePreference = async (
    prefId: string,
    field: "notify_job_applications" | "notify_quote_requests",
    value: boolean
  ) => {
    if (!isSuperAdmin) {
      toast.error("Only super admins can change notification settings");
      return;
    }

    setUpdating(`${prefId}-${field}`);
    try {
      const { error } = await supabase
        .from("notification_preferences")
        .update({ [field]: value } as any)
        .eq("id", prefId);

      if (error) throw error;

      setRecipients((prev) =>
        prev.map((r) =>
          r.id === prefId ? { ...r, [field]: value } : r
        )
      );
      toast.success("Preference updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update preference");
    } finally {
      setUpdating(null);
    }
  };

  const addRecipient = async () => {
    const email = newEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (recipients.some((r) => r.email.toLowerCase() === email)) {
      toast.error("This email is already in the list.");
      return;
    }

    setAdding(true);
    try {
      // Insert with a placeholder user_id (null-safe approach via edge function)
      // We need to store email directly — let's use the edge function
      const { error } = await supabase
        .from("notification_preferences")
        .insert({
          user_id: "00000000-0000-0000-0000-000000000000",
          email,
          notify_job_applications: true,
          notify_quote_requests: true,
        } as any);

      if (error) throw error;

      setNewEmail("");
      toast.success(`Added ${email} to notification recipients`);
      await fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to add recipient");
    } finally {
      setAdding(false);
    }
  };

  const removeRecipient = async (prefId: string, email: string) => {
    if (!isSuperAdmin) return;
    try {
      const { error } = await supabase
        .from("notification_preferences")
        .delete()
        .eq("id", prefId);

      if (error) throw error;

      setRecipients((prev) => prev.filter((r) => r.id !== prefId));
      toast.success(`Removed ${email}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to remove recipient");
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
        Configure who receives email notifications when new job applications or quote requests are submitted. You can add any email address — recipients don't need an admin account.
      </p>

      {!isSuperAdmin && (
        <div className="bg-muted rounded-lg p-4 mb-6 text-sm text-muted-foreground">
          Only super admins can modify notification settings. You can view current settings below.
        </div>
      )}

      {/* Add recipient */}
      {isSuperAdmin && (
        <div className="flex gap-3 mb-6">
          <Input
            type="email"
            placeholder="Enter email address…"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addRecipient()}
            className="max-w-sm"
          />
          <Button onClick={addRecipient} disabled={adding} className="gap-2">
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add
          </Button>
        </div>
      )}

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 text-sm font-medium">Recipient</th>
              <th className="text-center px-4 py-3 text-sm font-medium">Job Applications</th>
              <th className="text-center px-4 py-3 text-sm font-medium">Quote Requests</th>
              {isSuperAdmin && <th className="w-12 px-4 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {recipients.length === 0 ? (
              <tr>
                <td colSpan={isSuperAdmin ? 4 : 3} className="px-4 py-8 text-center text-muted-foreground">
                  No notification recipients configured. Add an email above to get started.
                </td>
              </tr>
            ) : (
              recipients.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm">
                    {r.email}
                    {r.is_admin && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Admin
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={r.notify_job_applications}
                        onCheckedChange={(val) =>
                          togglePreference(r.id, "notify_job_applications", val)
                        }
                        disabled={!isSuperAdmin || updating === `${r.id}-notify_job_applications`}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={r.notify_quote_requests}
                        onCheckedChange={(val) =>
                          togglePreference(r.id, "notify_quote_requests", val)
                        }
                        disabled={!isSuperAdmin || updating === `${r.id}-notify_quote_requests`}
                      />
                    </div>
                  </td>
                  {isSuperAdmin && (
                    <td className="px-4 py-3 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeRecipient(r.id, r.email)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Notifications include a brief summary and a PDF download link (valid for 7 days) so recipients don't need to log in.
      </p>

      {isSuperAdmin && (
        <div className="mt-8 border border-border rounded-lg p-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-heading font-bold text-lg mb-1">Verify email delivery</h2>
            <p className="text-sm text-muted-foreground">
              Send a test alert to every recipient above to confirm Resend is delivering to their inbox.
            </p>
          </div>
          <Button onClick={sendTestAlert} disabled={sendingTest} className="gap-2">
            {sendingTest ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send test alert
          </Button>
        </div>
      )}

    </div>
  );
};

export default NotificationSettings;
