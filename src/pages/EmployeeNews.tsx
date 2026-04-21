import { useState, useEffect } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SectionReveal from "@/components/SectionReveal";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";
import facilityFallback from "@/assets/facility-aerial.jpg";

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

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container relative z-10">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Journey</span>
              <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3">Company History</h2>
            </div>
          </SectionReveal>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />

            {timelineData.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <SectionReveal key={item.year} delay={i * 0.1}>
                  <div className={`relative flex items-start mb-12 last:mb-0 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}>
                    {/* Dot */}
                    <div className="absolute left-6 lg:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 mt-2 z-10" />

                    {/* Content */}
                    <div className={`ml-14 lg:ml-0 lg:w-[calc(50%-2rem)] ${
                      isLeft ? "lg:pr-0 lg:mr-auto lg:text-right" : "lg:pl-0 lg:ml-auto lg:text-left"
                    }`}>
                      <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors duration-300 relative overflow-hidden group">
                        <div className={`absolute -top-3 font-heading text-7xl lg:text-8xl font-extrabold text-muted/60 select-none leading-none ${
                          isLeft ? "-right-2 lg:-left-2 lg:right-auto" : "-right-2"
                        }`}>
                          {item.year}
                        </div>
                        <div className="relative z-10 pt-6">
                          <span className="text-primary font-heading font-bold text-sm">{item.year}</span>
                          <h3 className="font-heading font-bold text-xl mt-1 mb-2">{item.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Did You Know */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Fun Facts</span>
              <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3">Did You Know?</h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {didYouKnow.map((item, i) => {
              const isDark = i === 0 || i === 3;
              return (
                <SectionReveal key={item.accent} delay={i * 0.1}>
                  <div className={`rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[220px] ${
                    isDark
                      ? "bg-steel-gradient"
                      : "bg-card border border-border hover:border-primary/30 transition-colors duration-300"
                  }`}>
                    <div className={`absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold select-none leading-none ${
                      isDark ? "text-primary/15" : "text-muted/60"
                    }`}>
                      {item.accent}
                    </div>
                    <div className="relative z-10 pt-6">
                      <p className={`leading-relaxed text-base lg:text-lg ${
                        isDark ? "text-steel-muted" : "text-muted-foreground"
                      }`}>
                        {item.fact}
                      </p>
                    </div>
                    {!isDark && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    )}
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmployeeNews;
