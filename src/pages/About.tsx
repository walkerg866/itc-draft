import { Link } from "react-router-dom";
import { ArrowRight, Target, Handshake, Globe, Award } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import facilityImage from "@/assets/facility-aerial.jpg";

const milestones = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To be the premier provider of precision steel tubing solutions by delivering unmatched quality, service, and value to every customer, every time.",
  },
  {
    icon: Handshake,
    title: "Customer Partnership",
    description:
      "We don't just sell tubing — we partner with our customers to understand their unique requirements and engineer solutions that exceed expectations.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "From our Evansville, Indiana facility, we serve customers worldwide across five major industries, delivering consistent quality and reliability.",
  },
  {
    icon: Award,
    title: "Quality Commitment",
    description:
      "Every product undergoes rigorous quality control. Our high-frequency welded tubing meets and exceeds the most demanding industry standards.",
  },
];

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <img
          src={facilityImage}
          alt="Indiana Tube Corporation facility"
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
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {milestones.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <div className="bg-card rounded-lg p-8 shadow-industrial h-full border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
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
