import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { callAdminEdge } from "@/lib/adminApi";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, MessageSquareQuote, Loader2, LayoutDashboard, Bell, AlertTriangle } from "lucide-react";

const AdminHome = () => {
  const [stats, setStats] = useState({ admins: 0, applications: 0, quotes: 0, recipients: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const since = thirtyDaysAgo.toISOString();

        const [adminRes, appsRes, quotesRes, notifRes] = await Promise.all([
          callAdminEdge<unknown[]>("GET").catch(() => []),
          supabase
            .from("job_applications")
            .select("id", { count: "exact", head: true })
            .gte("submitted_at", since),
          supabase
            .from("quote_requests")
            .select("id", { count: "exact", head: true })
            .gte("submitted_at", since),
          supabase
            .from("notification_preferences")
            .select("id", { count: "exact", head: true }),
        ]);

        setStats({
          admins: Array.isArray(adminRes) ? adminRes.length : 0,
          applications: appsRes.count ?? 0,
          quotes: quotesRes.count ?? 0,
          recipients: notifRes.count ?? 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm">
        <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  const cards = [
    { label: "Admin Users", value: stats.admins, icon: Users, color: "text-blue-600" },
    { label: "Job Applications (30d)", value: stats.applications, icon: FileText, color: "text-emerald-600" },
    { label: "Quote Requests (30d)", value: stats.quotes, icon: MessageSquareQuote, color: "text-amber-600" },
    { label: "Notification Recipients", value: stats.recipients, icon: Bell, color: "text-violet-600" },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <LayoutDashboard className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Overview of your admin panel</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${c.color}`}>
                <c.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-heading font-extrabold">{c.value}</p>
                <p className="text-sm text-muted-foreground">{c.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
