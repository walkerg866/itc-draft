import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import IndustryCard from "@/components/IndustryCard";
import ValuePropsSection from "@/components/ValuePropsSection";
import HeroSlider from "@/components/HeroSlider";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";

// Static fallbacks
import facilityFallback from "@/assets/facility-aerial.jpg";
import automotiveFallback from "@/assets/industry-automotive.jpg";
import oilGasFallback from "@/assets/industry-oil-gas.jpg";
import hvacFallback from "@/assets/industry-hvac.jpg";
import heavyEquipFallback from "@/assets/industry-heavy-equip.jpg";
import structuralFallback from "@/assets/industry-structural.jpg";

const stats = [
  { value: "45+", label: "Years of Excellence" },
  { value: ".156\"–1.75\"", label: "Diameter Range" },
  { value: "5", label: "Key Industries" },
  { value: "Global", label: "Reach" },
];

const Index = () => {
  const { data: images } = useSiteImages();

  const industries = [
    {
      title: "Automotive & Transportation",
      description: "Coiled, cut-to-length, and fabricated assemblies delivering exceptional value for fluid-carrying and structural applications.",
      image: getImageUrl(images, "industry-automotive", automotiveFallback),
    },
    {
      title: "Oil & Gas — Energy Services",
      description: "Precision tubing manufactured to meet rigorous industry standards and the most demanding downhole and surface applications.",
      image: getImageUrl(images, "industry-oil-gas", oilGasFallback),
    },
    {
      title: "HVAC & Appliance",
      description: "Clean, high-quality tubing compatible with R134a and modern refrigerants for heating, cooling, and appliance systems.",
      image: getImageUrl(images, "industry-hvac", hvacFallback),
    },
    {
      title: "Heavy Equipment & Hydraulics",
      description: "High-pressure, induction-welded tubing built to perform in the most demanding hydraulic and heavy equipment environments.",
      image: getImageUrl(images, "industry-heavy-equip", heavyEquipFallback),
    },
    {
      title: "Hardware & Structural",
      description: "Reliable structural tubing for lawn & garden, furniture, and general fabrication with consistent quality every time.",
      image: getImageUrl(images, "industry-structural", structuralFallback),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSlider />

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="container py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-heading font-extrabold text-3xl lg:text-4xl text-primary mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Industries We Serve</span>
              <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-4">Tubing Solutions for Every Challenge</h2>
              <p className="text-muted-foreground text-lg">From automotive fuel lines to oil field operations, ITC tubing performs where it matters most.</p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.slice(0, 3).map((industry, i) => (
              <SectionReveal key={industry.title} delay={i * 0.1}>
                <IndustryCard {...industry} />
              </SectionReveal>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2">
            {industries.slice(3).map((industry, i) => (
              <SectionReveal key={industry.title} delay={(i + 3) * 0.1}>
                <IndustryCard {...industry} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <ValuePropsSection />

      {/* Facility / About Preview */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <div className="relative rounded-lg overflow-hidden shadow-industrial">
                <img
                  src={getImageUrl(images, "facility-aerial", facilityFallback)}
                  alt={getImageAlt(images, "facility-aerial", "Indiana Tube Corporation facility")}
                  className="w-full aspect-[16/10] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-transparent" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div>
                <span className="text-primary text-sm font-bold uppercase tracking-widest">About ITC</span>
                <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-6">Built on Expertise. Driven by Service.</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Indiana Tube Corporation is a diversified solution provider and manufacturer of low carbon mechanical grade welded steel tubing, serving customers worldwide. Our products are used across automotive, heavy truck, energy, HVAC, and structural applications.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We manufacture tubing with or without coatings from .156" to 1.75" diameter, in both standard and metric sizes. Every tube is high-frequency welded with modern steel welding technology, ensuring consistent quality and performance.
                </p>
                <Link to="/about" className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:gap-3 transition-all">
                  Learn More About Us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-steel-gradient py-20 lg:py-28">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-heading font-extrabold text-3xl lg:text-4xl text-secondary-foreground mb-6">
              Ready to Discuss Your <span className="text-gradient-orange">Tubing Needs?</span>
            </h2>
            <p className="text-steel-muted text-lg max-w-xl mx-auto mb-10">
              Our experienced team is ready to help you find the perfect tubing solution. Get in touch for a custom quote today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow text-lg">
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="tel:+18124249028" className="inline-flex items-center gap-2 px-8 py-4 border border-secondary-foreground/20 text-secondary-foreground font-heading font-bold rounded-md hover:bg-secondary-foreground/10 transition-colors text-lg">
                Call (812) 424-9028
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
