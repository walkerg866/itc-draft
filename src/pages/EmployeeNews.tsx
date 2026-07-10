import { useState, useEffect } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SectionReveal from "@/components/SectionReveal";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";
import facilityFallback from "@/assets/facility-aerial.jpg";
import SEO from "@/components/SEO";

interface Alert {
  id: string;
  message: string;
  created_at: string;
  expires_at: string | null;
}


const EmployeeNews = () => {
  const { data: images } = useSiteImages();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const { data } = await supabase
        .from("weather_alerts")
        .select("id, message, created_at, expires_at")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (data) {
        const now = new Date();
        setAlerts(data.filter((a) => !a.expires_at || new Date(a.expires_at) > now));
      }
    };

    fetchAlerts();

    const channel = supabase
      .channel("employee-news-alerts")
      .on("postgres_changes", { event: "*", schema: "public", table: "weather_alerts" }, () => {
        fetchAlerts();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div>
      <SEO title={"Employee News | Indiana Tube Corporation"} description={"Company announcements, achievements, and timeline updates for Indiana Tube Corporation employees."} path={"/employee-news"} />
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <img
          src={getImageUrl(images, "facility-aerial", facilityFallback)}
          alt={getImageAlt(images, "facility-aerial", "Indiana Tube Corporation facility")}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container relative z-10">
          <SectionReveal>
            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Employee News</span>
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-secondary-foreground mt-3 mb-6 leading-tight">
                Announcements &amp; <span className="text-gradient-orange">Company Updates</span>
              </h1>
              <p className="text-white text-lg leading-relaxed">
                Stay informed with the latest company announcements, milestones, and achievements.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <SectionReveal>
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Latest Updates</span>
            <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-10">Announcements</h2>
          </SectionReveal>

          {alerts.length === 0 ? (
            <SectionReveal delay={0.1}>
              <div className="bg-muted rounded-xl p-8 flex items-center gap-4 text-muted-foreground">
                <Info className="h-5 w-5 shrink-0" />
                <span>No announcements at this time. Check back soon!</span>
              </div>
            </SectionReveal>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert, i) => (
                <SectionReveal key={alert.id} delay={i * 0.1}>
                  <div className="bg-steel-gradient rounded-xl p-6 lg:p-8 flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-secondary-foreground font-medium text-base lg:text-lg">{alert.message}</p>
                      <p className="text-steel-muted text-sm mt-2">
                        Posted {new Date(alert.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmployeeNews;
