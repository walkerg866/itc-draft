import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "@/components/SectionReveal";

const valueProps = [
  {
    title: "Uncompromising Quality",
    description:
      "Every tube is high-frequency welded with the most advanced steel welding technology available, ensuring consistent performance.",
    accent: "01",
  },
  {
    title: "Precision Engineering",
    description:
      'Custom tubing solutions from .156" to 1.75" diameter, in both standard and metric sizes, with or without coatings.',
    accent: "02",
  },
  {
    title: "Customer-First Approach",
    description:
      "Deep product knowledge and dedicated service teams who understand your specific tubing requirements from first call to delivery.",
    accent: "03",
  },
  {
    title: "Complete Solutions Provider",
    description:
      "From raw tubing to fabricated assemblies — coiled, cut to length, or custom-built to your exact specifications.",
    accent: "04",
  },
];

const ValuePropsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container relative z-10">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">
              Why ITC
            </span>
            <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-4">
              The Right Choice for Steel Tubing
            </h2>
            <p className="text-muted-foreground text-lg">
              Deep expertise, exceptional service, and a relentless commitment
              to understanding your tubing requirements.
            </p>
          </div>
        </SectionReveal>

        {/* 2×2 Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Featured dark card — top left */}
          <SectionReveal delay={0}>
            <div className="bg-steel-gradient rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[260px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 128 128" fill="none" className="w-full h-full">
                  <circle cx="128" cy="0" r="96" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <circle cx="128" cy="0" r="64" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                  <circle cx="128" cy="0" r="32" stroke="hsl(var(--primary))" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <span className="font-heading text-5xl font-extrabold text-primary/20 select-none mb-5 block">
                  {valueProps[0].accent}
                </span>
                <h3 className="font-heading font-bold text-xl lg:text-2xl text-secondary-foreground mb-3">
                  {valueProps[0].title}
                </h3>
                <p className="text-steel-muted leading-relaxed text-base lg:text-lg">
                  {valueProps[0].description}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-secondary-foreground/10">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-heading font-bold text-sm hover:gap-3 transition-all"
                >
                  Learn about our process <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </SectionReveal>

          {/* Top right */}
          <SectionReveal delay={0.1}>
            <div className="bg-card rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[260px] border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="absolute -top-2 -right-2 font-heading text-8xl font-extrabold text-muted/60 select-none leading-none">
                {valueProps[1].accent}
              </div>
              <div className="relative z-10">
                <h3 className="font-heading font-bold text-xl lg:text-2xl mb-3 mt-8">
                  {valueProps[1].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {valueProps[1].description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </SectionReveal>

          {/* Bottom left */}
          <SectionReveal delay={0.2}>
            <div className="bg-card rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[260px] border border-border hover:border-primary/30 transition-colors duration-300">
              <div className="absolute -top-2 -right-2 font-heading text-8xl font-extrabold text-muted/60 select-none leading-none">
                {valueProps[2].accent}
              </div>
              <div className="relative z-10">
                <h3 className="font-heading font-bold text-xl lg:text-2xl mb-3 mt-8">
                  {valueProps[2].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {valueProps[2].description}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </SectionReveal>

          {/* Bottom right — dark card */}
          <SectionReveal delay={0.3}>
            <div className="bg-steel-gradient rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[260px] flex flex-col justify-between">
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
                <svg viewBox="0 0 128 128" fill="none" className="w-full h-full">
                  <circle cx="0" cy="128" r="96" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <circle cx="0" cy="128" r="64" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                  <circle cx="0" cy="128" r="32" stroke="hsl(var(--primary))" strokeWidth="1" />
                </svg>
              </div>
              <div>
                <span className="font-heading text-5xl font-extrabold text-primary/20 select-none mb-5 block">
                  {valueProps[3].accent}
                </span>
                <h3 className="font-heading font-bold text-xl lg:text-2xl text-secondary-foreground mb-3">
                  {valueProps[3].title}
                </h3>
                <p className="text-steel-muted leading-relaxed text-base lg:text-lg">
                  {valueProps[3].description}
                </p>
              </div>
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
