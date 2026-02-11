import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";
import heroFallback from "@/assets/hero-steel-tubes.jpg";

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
  const { data: images } = useSiteImages();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <img
          src={getImageUrl(images, "hero-steel-tubes", heroFallback)}
          alt={getImageAlt(images, "hero-steel-tubes", "Steel tubing products")}
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

          {/* 2×2 Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Top left — dark */}
            <SectionReveal delay={0}>
              <div className="bg-steel-gradient rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[340px]">
                <div className="absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold text-primary/15 select-none leading-none">01</div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl text-secondary-foreground mb-2 mt-8">
                    {productCategories[0].title}
                  </h3>
                   <p className="text-primary/80 text-lg font-medium mb-5">{productCategories[0].specs}</p>
                   <ul className="space-y-3">
                     {productCategories[0].features.map((feature) => (
                       <li key={feature} className="flex items-start gap-3 text-steel-muted text-lg">
                         <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                         <span>{feature}</span>
                       </li>
                     ))}
                  </ul>
                </div>
              </div>
            </SectionReveal>

            {/* Top right — light */}
            <SectionReveal delay={0.1}>
              <div className="bg-card rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[340px] border border-border hover:border-primary/30 transition-colors duration-300">
                <div className="absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold text-muted/60 select-none leading-none">02</div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-2 mt-8">{productCategories[1].title}</h3>
                   <p className="text-primary text-lg font-medium mb-5">{productCategories[1].specs}</p>
                   <ul className="space-y-3">
                     {productCategories[1].features.map((feature) => (
                       <li key={feature} className="flex items-start gap-3 text-muted-foreground text-lg">
                         <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                         <span>{feature}</span>
                       </li>
                     ))}
                  </ul>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </SectionReveal>

            {/* Bottom left — light */}
            <SectionReveal delay={0.2}>
              <div className="bg-card rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[340px] border border-border hover:border-primary/30 transition-colors duration-300">
                <div className="absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold text-muted/60 select-none leading-none">03</div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl mb-2 mt-8">{productCategories[2].title}</h3>
                   <p className="text-primary text-lg font-medium mb-5">{productCategories[2].specs}</p>
                   <ul className="space-y-3">
                     {productCategories[2].features.map((feature) => (
                       <li key={feature} className="flex items-start gap-3 text-muted-foreground text-lg">
                         <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                         <span>{feature}</span>
                       </li>
                     ))}
                  </ul>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </SectionReveal>

            {/* Bottom right — dark */}
            <SectionReveal delay={0.3}>
              <div className="bg-steel-gradient rounded-xl p-8 lg:p-10 relative overflow-hidden group h-full min-h-[340px]">
                <div className="absolute -top-3 -right-3 font-heading text-8xl lg:text-9xl font-extrabold text-primary/15 select-none leading-none">04</div>
                <div className="relative z-10">
                  <h3 className="font-heading font-bold text-2xl lg:text-3xl text-secondary-foreground mb-2 mt-8">
                    {productCategories[3].title}
                  </h3>
                   <p className="text-primary/80 text-lg font-medium mb-5">{productCategories[3].specs}</p>
                   <ul className="space-y-3">
                     {productCategories[3].features.map((feature) => (
                       <li key={feature} className="flex items-start gap-3 text-steel-muted text-lg">
                         <Check className="h-5 w-5 text-primary mt-1 shrink-0" />
                         <span>{feature}</span>
                       </li>
                     ))}
                  </ul>
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
