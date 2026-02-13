import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

interface JobListing {
  id: string;
  title: string;
  department: string | null;
  location: string;
  employment_type: string;
  shift: string | null;
  description: string;
  requirements: string | null;
}

const Careers = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await supabase
        .from("job_listings")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (data) setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-steel-gradient py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Careers
              </span>
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-secondary-foreground mt-3 mb-6 leading-tight">
                Join the{" "}
                <span className="text-gradient-orange">ITC Team</span>
              </h1>
              <p className="text-white text-lg leading-relaxed">
                We're always looking for talented, hard-working individuals to
                join our team. Explore open positions below and apply today.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Listings */}
      <section className="py-20 lg:py-28">
        <div className="container max-w-3xl">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-12">
              <Loader2 className="h-5 w-5 animate-spin" /> Loading positions…
            </div>
          ) : jobs.length === 0 ? (
            <SectionReveal>
              <div className="text-center py-16">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                <h2 className="font-heading font-bold text-xl mb-2">
                  No Open Positions
                </h2>
                <p className="text-muted-foreground">
                  We don't have any openings right now, but check back soon! You
                  can also{" "}
                  <Link to="/contact" className="text-primary hover:underline">
                    contact us
                  </Link>{" "}
                  to submit a general inquiry.
                </p>
              </div>
            </SectionReveal>
          ) : (
            <div className="space-y-5">
              {jobs.map((job, i) => (
                <SectionReveal key={job.id} delay={i * 0.05}>
                  <div className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-industrial transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="font-heading font-bold text-lg">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                          {job.department && (
                            <span>{job.department}</span>
                          )}
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {job.employment_type}
                            {job.shift && ` · ${job.shift}`}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mt-3 line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                      <Link
                        to={`/careers/apply/${job.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow shrink-0"
                      >
                        Apply <ArrowRight className="h-4 w-4" />
                      </Link>
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

export default Careers;
