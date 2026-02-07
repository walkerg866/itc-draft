import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import heroImage from "@/assets/hero-steel-tubes.jpg";

const productCategories = [
  {
    title: "Round Tubing",
    specs: "OD: .156\" to 1.75\" | Wall: .028\" to .134\"",
    features: [
      "Single wall, induction welded",
      "Low carbon steel (SAE 1008–1010)",
      "Standard and metric sizes",
      "Available with or without coatings",
      "Cut to length or coiled",
    ],
  },
  {
    title: "Coated Tubing",
    specs: "Zinc, copper, tin, and polymer coatings",
    features: [
      "Corrosion protection",
      "Enhanced brazeability",
      "Improved appearance",
      "Multiple coating thicknesses",
      "Custom coating solutions",
    ],
  },
  {
    title: "Fabricated Assemblies",
    specs: "Custom bend, cut, flare, and end-forming",
    features: [
      "Multi-bend configurations",
      "End forming and flaring",
      "Bracket and fitting assembly",
      "Pressure tested",
      "Ready-to-install solutions",
    ],
  },
  {
    title: "Specialty Tubing",
    specs: "Application-specific solutions",
    features: [
      "High-pressure tubing",
      "Capillary tubing",
      "Double wall tubing",
      "Bundy tubing",
      "Custom OD/wall combinations",
    ],
  },
];

const specs = [
  { label: "Material", value: "Low Carbon Steel (SAE 1008–1010)" },
  { label: "OD Range", value: ".156\" to 1.75\"" },
  { label: "Wall Thickness", value: ".028\" to .134\"" },
  { label: "Lengths", value: "Cut to length or coiled" },
  { label: "Welding", value: "High frequency induction" },
  { label: "Sizes", value: "Standard & Metric" },
];

const Products = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <img
          src={heroImage}
          alt="Steel tubing products"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container relative z-10">
          <SectionReveal>
            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Products
              </span>
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-secondary-foreground mt-3 mb-6 leading-tight">
                Precision Tubing{" "}
                <span className="text-gradient-orange">Your Way</span>
              </h1>
              <p className="text-steel-muted text-lg leading-relaxed">
                Indiana Tube is a solution provider for a wide range of precision
                custom tubing products. We produce tubing from .156" to 1.75"
                diameter, in both standard and metric sizes.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Product Lines
              </span>
              <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-4">
                Complete Tubing Solutions
              </h2>
              <p className="text-muted-foreground text-lg">
                From raw tubing to finished assemblies, we deliver exactly what
                your application demands.
              </p>
            </div>
          </SectionReveal>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Featured card — Round Tubing */}
            <SectionReveal delay={0}>
              <div className="bg-steel-gradient rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[320px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <svg viewBox="0 0 128 128" fill="none" className="w-full h-full">
                    <circle cx="128" cy="0" r="96" stroke="hsl(var(--primary))" strokeWidth="2" />
                    <circle cx="128" cy="0" r="64" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                    <circle cx="128" cy="0" r="32" stroke="hsl(var(--primary))" strokeWidth="1" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-heading text-5xl font-extrabold text-primary/20 select-none">01</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl lg:text-2xl text-secondary-foreground mb-2">
                    {productCategories[0].title}
                  </h3>
                  <p className="text-primary/80 text-sm font-medium mb-5">{productCategories[0].specs}</p>
                  <ul className="space-y-2.5">
                    {productCategories[0].features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-steel-muted text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SectionReveal>

            {/* Right column — stacked pair */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SectionReveal delay={0.1}>
                <div className="bg-card rounded-xl p-7 relative overflow-hidden group h-full border border-border hover:border-primary/30 transition-colors duration-300">
                  <div className="absolute -top-2 -right-2 font-heading text-7xl font-extrabold text-muted/80 select-none leading-none">02</div>
                  <div className="relative z-10">
                    <h3 className="font-heading font-bold text-lg mb-2">{productCategories[1].title}</h3>
                    <p className="text-primary text-sm font-medium mb-4">{productCategories[1].specs}</p>
                    <ul className="space-y-2.5">
                      {productCategories[1].features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-muted-foreground text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="bg-card rounded-xl p-7 relative overflow-hidden group h-full border border-border hover:border-primary/30 transition-colors duration-300">
                  <div className="absolute -top-2 -right-2 font-heading text-7xl font-extrabold text-muted/80 select-none leading-none">03</div>
                  <div className="relative z-10">
                    <h3 className="font-heading font-bold text-lg mb-2">{productCategories[2].title}</h3>
                    <p className="text-primary text-sm font-medium mb-4">{productCategories[2].specs}</p>
                    <ul className="space-y-2.5">
                      {productCategories[2].features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-muted-foreground text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </SectionReveal>
            </div>

            {/* Full-width bottom card — Specialty Tubing */}
            <SectionReveal delay={0.3}>
              <div className="md:col-span-2 lg:col-span-3 bg-card rounded-xl p-7 lg:p-8 relative overflow-hidden group border border-border hover:border-primary/30 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="font-heading text-6xl font-extrabold text-muted/60 select-none leading-none">04</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg lg:text-xl mb-2">{productCategories[3].title}</h3>
                    <p className="text-primary text-sm font-medium mb-4">{productCategories[3].specs}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {productCategories[3].features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-muted-foreground text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container">
          <SectionReveal>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-primary text-sm font-bold uppercase tracking-widest">
                  Specifications
                </span>
                <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3">
                  General Capabilities
                </h2>
              </div>

              <div className="bg-card rounded-lg shadow-industrial overflow-hidden border border-border">
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between px-8 py-5 ${
                      i < specs.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="font-heading font-bold text-sm text-muted-foreground uppercase tracking-wide">
                      {spec.label}
                    </span>
                    <span className="font-medium text-foreground">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Downloads CTA */}
      <section className="bg-steel-gradient py-20">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-heading font-extrabold text-3xl lg:text-4xl text-secondary-foreground mb-6">
              Need Detailed Specifications?
            </h2>
            <p className="text-steel-muted text-lg max-w-xl mx-auto mb-8">
              Contact our team for detailed product data sheets, capability
              guides, and custom tubing specifications.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Products;
