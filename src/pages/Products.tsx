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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {productCategories.map((category, i) => (
              <SectionReveal key={category.title} delay={i * 0.1}>
                <div className="bg-card rounded-lg p-8 shadow-industrial hover:shadow-xl transition-shadow duration-300 h-full border border-border">
                  <h3 className="font-heading font-bold text-xl mb-2">
                    {category.title}
                  </h3>
                  <p className="text-primary text-sm font-medium mb-5">
                    {category.specs}
                  </p>
                  <ul className="space-y-3">
                    {category.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            ))}
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
