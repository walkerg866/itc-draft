import { useState, useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const WeatherAlert = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const fetchActive = async () => {
      const { data } = await supabase
        .from("weather_alerts")
        .select("message, expires_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        const alert = data[0];
        // Check if expired
        if (alert.expires_at && new Date(alert.expires_at) < new Date()) {
          setMessage(null);
        } else {
          setMessage(alert.message);
        }
      } else {
        setMessage(null);
      }
    };

    fetchActive();

    // Realtime subscription for instant updates
    const channel = supabase
      .channel("public-weather-alerts")
      .on("postgres_changes", { event: "*", schema: "public", table: "weather_alerts" }, () => {
        fetchActive();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!message || dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between gap-4 py-3 text-sm font-medium">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-sm p-1 opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default WeatherAlert;
