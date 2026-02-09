import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";
import facilityFallback from "@/assets/facility-aerial.jpg";

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

const About = () => {
  const { data: images } = useSiteImages();

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
                45+ Years of{" "}
                <span className="text-gradient-orange">
                  Steel Tubing Excellence
                </span>
              </h1>
              <p className="text-steel-muted text-lg leading-relaxed">
                Indiana Tube Corporation is a diversified solution provider and
                manufacturer of low carbon mechanical grade welded steel tubing,
                serving customers worldwide.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 lg:py-28">
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
        <div className="container text-center">
          <SectionReveal>
            <span className="text-primary text-sm font-bold uppercase tracking-widest">
              Our Parent Company
            </span>
            <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-6">
              A Steel Partners Company
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
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
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
