import { Link } from "react-router-dom";
import { ArrowRight, Linkedin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import SectionReveal from "@/components/SectionReveal";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";
import { supabase } from "@/integrations/supabase/client";
import facilityFallback from "@/assets/facility-aerial.jpg";
import steelPartnersLogo from "@/assets/steel-partners-logo.webp";

const milestones = [
  {
    title: "Our Mission",
    description:
      "To be the premier provider of precision steel tubing solutions by delivering unmatched quality, service, and value to every customer, every time.",
    accent: "01",
  },
  {
    title: "Customer Partnership",
    description:
      "We don't just sell tubing — we partner with our customers to understand their unique requirements and engineer solutions that exceed expectations.",
    accent: "02",
  },
  {
    title: "Global Reach",
    description:
      "From our Evansville, Indiana facility, we serve customers worldwide across five major industries, delivering consistent quality and reliability.",
    accent: "03",
  },
  {
    title: "Quality Commitment",
    description:
      "Every product undergoes rigorous quality control. Our high-frequency welded tubing meets and exceeds the most demanding industry standards.",
    accent: "04",
  },
];

const timelineData = [
  { year: "1973", title: "Founded", description: "Indiana Tube Corporation established in Evansville, Indiana as a precision steel tubing manufacturer." },
  { year: "1985", title: "Capacity Expansion", description: "Expanded manufacturing capacity to meet growing automotive and industrial demand." },
  { year: "1995", title: "ISO Certified", description: "Achieved ISO certification, reinforcing commitment to world-class quality standards." },
  { year: "2005", title: "Oil & Gas Market", description: "Entered the Oil & Gas energy sector, diversifying product applications and customer base." },
  { year: "2015", title: "Steel Partners", description: "Joined the Steel Partners family, gaining the backing of a diversified global holding company." },
  { year: "2020", title: "Modernization", description: "Completed major facility modernization, upgrading equipment and expanding capabilities." },
];

const didYouKnow = [
  { accent: "01", fact: "ITC tubing is used in vehicles driven by millions of people every day across the globe." },
  { accent: "02", fact: "Our Evansville facility spans over 200,000 square feet of advanced manufacturing space." },
  { accent: "03", fact: "We serve customers across 5 major industries on multiple continents worldwide." },
  { accent: "04", fact: "ITC manufactures tubing in both Standard and Metric sizes for maximum versatility." },
];

const About = () => {
  const { data: images } = useSiteImages();
  const { data: bios = [] } = useQuery({
    queryKey: ["executive-bios"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("executive_bios")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

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
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                About Us
              </span>
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-secondary-foreground mt-3 mb-6 leading-tight">
                50+ Years of{" "}
                <span className="text-gradient-orange">
                  Steel Tubing Excellence
                </span>
              </h1>
              <p className="text-white text-lg leading-relaxed">
                Indiana Tube Corporation is a diversified solution provider and
                manufacturer of low carbon mechanical grade welded steel tubing,
                serving customers worldwide.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* About Content */}
      <section className="pt-20 pb-10 lg:pt-28 lg:pb-14">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <SectionReveal>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Indiana Tube Corporation (ITC) is a diversified solution
                  provider and manufacturer of low carbon mechanical grade welded
                  steel tubing, serving customers worldwide. ITC products are used
                  in a variety of fluid and gas carrying applications for
                  Automotive, Large Truck, Heavy Equipment, Oil & Gas, and
                  Refrigeration.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Additionally, ITC manufactures non-fluid carrying tube for
                  applications such as heating elements, welding rods, sun visor
                  rods, and filtration products. ITC manufactures a wide range of
                  tube diameter and wall thickness in both Standard and Metric
                  sizes.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With over 45 years of experience, Indiana Tube has built a
                  reputation on very strong product knowledge, exceptional customer
                  service, and a deep dedication to understanding our customers'
                  tubing requirements. It's what makes ITC the right choice when
                  selecting a provider for your steel tubing needs.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Executive Leadership */}
      {bios.length > 0 && (
        <section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
          <div className="container">
            <SectionReveal>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-primary text-sm font-bold uppercase tracking-widest">
                  Leadership
                </span>
                <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3">
                  Executive Leadership
                </h2>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {bios.map((bio, i) => (
                <SectionReveal key={bio.id} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center">
                    {bio.linkedin_url ? (
                      <a href={bio.linkedin_url} target="_blank" rel="noopener noreferrer" className="group relative mb-4">
                        <div className="h-32 w-32 rounded-full overflow-hidden bg-muted border-2 border-border group-hover:border-primary transition-colors">
                          {bio.image_url ? (
                            <img src={bio.image_url} alt={bio.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-muted-foreground">{bio.name.charAt(0)}</div>
                          )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 shadow-md">
                          <Linkedin className="h-3.5 w-3.5" />
                        </div>
                      </a>
                    ) : (
                      <div className="h-32 w-32 rounded-full overflow-hidden bg-muted border-2 border-border mb-4">
                        {bio.image_url ? (
                          <img src={bio.image_url} alt={bio.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-muted-foreground">{bio.name.charAt(0)}</div>
                        )}
                      </div>
                    )}
                    <h3 className="font-heading font-bold text-lg">{bio.name}</h3>
                    <p className="text-muted-foreground text-sm">{bio.title}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Values Grid */}
      <section className="py-20 lg:py-28 bg-muted relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="container relative z-10">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Our Values
              </span>
              <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3">
                What Drives Us Forward
              </h2>
            </div>
          </SectionReveal>

          {/* 2×2 Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Top left — dark */}
            <SectionReveal delay={0}>
              <div className="bg-steel-gradient rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[280px]">
                <div className="absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold text-primary/15 select-none leading-none">
                  {milestones[0].accent}
                </div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl text-secondary-foreground mb-4 mt-8">
                    {milestones[0].title}
                  </h3>
                  <p className="text-steel-muted leading-relaxed text-base lg:text-lg">
                    {milestones[0].description}
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Top right — light */}
            <SectionReveal delay={0.1}>
              <div className="bg-card rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[280px] border border-border hover:border-primary/30 transition-colors duration-300">
                <div className="absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold text-muted/60 select-none leading-none">
                  {milestones[1].accent}
                </div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-4 mt-8">
                    {milestones[1].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                    {milestones[1].description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </SectionReveal>

            {/* Bottom left — light */}
            <SectionReveal delay={0.2}>
              <div className="bg-card rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[280px] border border-border hover:border-primary/30 transition-colors duration-300">
                <div className="absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold text-muted/60 select-none leading-none">
                  {milestones[2].accent}
                </div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-4 mt-8">
                    {milestones[2].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
                    {milestones[2].description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </SectionReveal>

            {/* Bottom right — dark */}
            <SectionReveal delay={0.3}>
              <div className="bg-steel-gradient rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[280px]">
                <div className="absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold text-primary/15 select-none leading-none">
                  {milestones[3].accent}
                </div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl text-secondary-foreground mb-4 mt-8">
                    {milestones[3].title}
                  </h3>
                  <p className="text-steel-muted leading-relaxed text-base lg:text-lg">
                    {milestones[3].description}
                  </p>
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Steel Partners */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Logo */}
              <div className="flex items-center justify-center">
                <a href="https://www.steelpartners.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    src={steelPartnersLogo}
                    alt="Steel Partners Holdings logo"
                    className="max-w-[280px] lg:max-w-[340px] w-full hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>

              {/* Text */}
              <div>
                <span className="text-primary text-sm font-bold uppercase tracking-widest">
                  Our Parent Company
                </span>
                <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-6">
                  A Steel Partners Company
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Indiana Tube Corporation operates as part of the Steel Partners
                  family, bringing the backing of a diversified global holding
                  company to our precision tubing operations.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:gap-3 transition-all"
                >
                  Get in Touch <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
