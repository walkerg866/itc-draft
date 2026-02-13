import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { CloudLightning, Send, Trash2, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface WeatherAlert {
  id: string;
  message: string;
  is_active: boolean;
  duration_hours: number | null;
  expires_at: string | null;
  created_at: string;
}

const DURATION_OPTIONS = [
  { label: "12 hours", value: 12 },
  { label: "24 hours", value: 24 },
  { label: "Until cleared", value: 0 },
];

const WeatherAlertManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(12);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchAlerts = async () => {
    const { data, error } = await supabase
      .from("weather_alerts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) {
      setAlerts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();

    // Realtime subscription
    const channel = supabase
      .channel("admin-weather-alerts")
      .on("postgres_changes", { event: "*", schema: "public", table: "weather_alerts" }, () => {
        fetchAlerts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    setPosting(true);

    const expiresAt = duration > 0
      ? new Date(Date.now() + duration * 60 * 60 * 1000).toISOString()
      : null;

    const { error } = await supabase.from("weather_alerts").insert({
      message: message.trim(),
      duration_hours: duration > 0 ? duration : null,
      expires_at: expiresAt,
      created_by: user.id,
      is_active: true,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Alert posted", description: "The weather alert is now live on the site." });
      setMessage("");
    }
    setPosting(false);
  };

  const handleDeactivate = async (id: string) => {
    const { error } = await supabase
      .from("weather_alerts")
      .update({ is_active: false })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Alert cleared" });
    }
  };

  const activeAlerts = alerts.filter((a) => a.is_active);
  const pastAlerts = alerts.filter((a) => !a.is_active);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <CloudLightning className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Weather Alerts</h1>
          <p className="text-muted-foreground text-sm">Post or clear alerts displayed site-wide.</p>
        </div>
      </div>

      {/* Post new alert */}
      <form
        onSubmit={handlePost}
        className="bg-card rounded-lg p-6 border border-border shadow-sm mb-8"
      >
        <h3 className="font-heading font-bold mb-4">Post New Alert</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alert-message">Alert Message</Label>
            <Input
              id="alert-message"
              placeholder="e.g. Plant closed today due to severe weather. Normal operations resume tomorrow."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Duration</Label>
            <div className="flex flex-wrap gap-2">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDuration(opt.value)}
                  className={`px-3 py-1.5 text-sm rounded-md border transition-colors ${
                    duration === opt.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={posting || !message.trim()} className="font-heading font-bold">
            {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Post Alert
          </Button>
        </div>
      </form>

      {/* Active alerts */}
      <div className="mb-8">
        <h3 className="font-heading font-bold text-lg mb-3">
          Active Alerts ({activeAlerts.length})
        </h3>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : activeAlerts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No active alerts.</p>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20"
              >
                <CloudLightning className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{alert.message}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>Posted {new Date(alert.created_at).toLocaleString()}</span>
                    {alert.expires_at && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Expires {new Date(alert.expires_at).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 shrink-0"
                  onClick={() => handleDeactivate(alert.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past alerts */}
      {pastAlerts.length > 0 && (
        <div>
          <h3 className="font-heading font-bold text-lg mb-3 text-muted-foreground">
            Past Alerts
          </h3>
          <div className="space-y-2">
            {pastAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 text-muted-foreground"
              >
                <CloudLightning className="h-4 w-4 mt-0.5 shrink-0 opacity-50" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{alert.message}</p>
                  <span className="text-xs">
                    {new Date(alert.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherAlertManager;
