import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";
import IndustryCard from "@/components/IndustryCard";
import ValuePropsSection from "@/components/ValuePropsSection";

import heroImage from "@/assets/hero-steel-tubes.jpg";
import facilityImage from "@/assets/facility-aerial.jpg";
import automotiveImg from "@/assets/industry-automotive.jpg";
import oilGasImg from "@/assets/industry-oil-gas.jpg";
import hvacImg from "@/assets/industry-hvac.jpg";
import heavyEquipImg from "@/assets/industry-heavy-equip.jpg";
import structuralImg from "@/assets/industry-structural.jpg";

const industries = [
  {
    title: "Automotive & Transportation",
    description:
      "Coiled, cut-to-length, and fabricated assemblies delivering exceptional value for fluid-carrying and structural applications.",
    image: automotiveImg,
  },
  {
    title: "Oil & Gas — Energy Services",
    description:
      "Precision tubing manufactured to meet rigorous industry standards and the most demanding downhole and surface applications.",
    image: oilGasImg,
  },
  {
    title: "HVAC & Appliance",
    description:
      "Clean, high-quality tubing compatible with R134a and modern refrigerants for heating, cooling, and appliance systems.",
    image: hvacImg,
  },
  {
    title: "Heavy Equipment & Hydraulics",
    description:
      "High-pressure, induction-welded tubing built to perform in the most demanding hydraulic and heavy equipment environments.",
    image: heavyEquipImg,
  },
  {
    title: "Hardware & Structural",
    description:
      "Reliable structural tubing for lawn & garden, furniture, and general fabrication with consistent quality every time.",
    image: structuralImg,
  },
];

const stats = [
  { value: "45+", label: "Years of Excellence" },
  { value: ".156\"–1.75\"", label: "Diameter Range" },
  { value: "5", label: "Key Industries" },
  { value: "Global", label: "Reach" },
];


const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Precision steel tubing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-semibold uppercase tracking-widest">
                45+ Years of Excellence
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-secondary-foreground leading-[1.1] mb-6">
              Precision Steel Tubing.{" "}
              <span className="text-gradient-orange">
                Engineered to Perform.
              </span>
            </h1>

            <p className="text-steel-muted text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              Indiana Tube Corporation is your complete source for high-quality,
              induction-welded, low carbon steel tubing — trusted across five
              major industries worldwide.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-secondary-foreground/20 text-secondary-foreground font-heading font-bold rounded-md hover:bg-secondary-foreground/10 transition-colors"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Subtle bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="container py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <SectionReveal key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-heading font-extrabold text-3xl lg:text-4xl text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium">
                    {stat.label}
                  </div>
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
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Industries We Serve
              </span>
              <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-4">
                Tubing Solutions for Every Challenge
              </h2>
              <p className="text-muted-foreground text-lg">
                From automotive fuel lines to oil field operations, ITC tubing
                performs where it matters most.
              </p>
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
                  src={facilityImage}
                  alt="Indiana Tube Corporation facility"
                  className="w-full aspect-[16/10] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 to-transparent" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div>
                <span className="text-primary text-sm font-bold uppercase tracking-widest">
                  About ITC
                </span>
                <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-6">
                  Built on Expertise. Driven by Service.
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Indiana Tube Corporation is a diversified solution provider and
                  manufacturer of low carbon mechanical grade welded steel tubing,
                  serving customers worldwide. Our products are used across
                  automotive, heavy truck, energy, HVAC, and structural
                  applications.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We manufacture tubing with or without coatings from .156" to
                  1.75" diameter, in both standard and metric sizes. Every tube is
                  high-frequency welded with modern steel welding technology,
                  ensuring consistent quality and performance.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:gap-3 transition-all"
                >
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
              Ready to Discuss Your{" "}
              <span className="text-gradient-orange">Tubing Needs?</span>
            </h2>
            <p className="text-steel-muted text-lg max-w-xl mx-auto mb-10">
              Our experienced team is ready to help you find the perfect tubing
              solution. Get in touch for a custom quote today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow text-lg"
              >
                Request a Quote <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="tel:+18124249028"
                className="inline-flex items-center gap-2 px-8 py-4 border border-secondary-foreground/20 text-secondary-foreground font-heading font-bold rounded-md hover:bg-secondary-foreground/10 transition-colors text-lg"
              >
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
