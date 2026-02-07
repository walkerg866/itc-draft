import { Link } from "react-router-dom";
import { Download, FileText, ArrowRight, ExternalLink } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import heroImage from "@/assets/hero-steel-tubes.jpg";

interface DownloadItem {
  name: string;
  description?: string;
  placeholder?: boolean;
}

interface DownloadSection {
  id: string;
  number: string;
  title: string;
  description: string;
  items: DownloadItem[];
  requestUrl?: string;
  requestLabel?: string;
}

const downloadSections: DownloadSection[] = [
  {
    id: "certifications",
    number: "01",
    title: "Certifications & Declarations",
    description:
      "Indiana Tube Corporation QMS is designed to ensure conformance to rigid customer requirements through continuous improvement actions to sustain and increase product efficiency and performance for our customers. We are committed to a sustainable future and the environmental well-being of the communities we serve.",
    items: [
      { name: "ISO 9001:2015 Certificate", placeholder: true },
      { name: "IATF 16949:2016 Certificate", placeholder: true },
      { name: "Conflict Minerals Declaration", placeholder: true },
      { name: "REACH Declaration", placeholder: true },
      { name: "RoHS Declaration", placeholder: true },
      { name: "California Proposition 65 Statement", placeholder: true },
      { name: "Environmental Policy Statement", placeholder: true },
    ],
    requestUrl: "/contact",
    requestLabel: "Request Specific Declaration Documentation",
  },
  {
    id: "product-literature",
    number: "02",
    title: "Product Literature",
    description:
      "Download our latest product catalogs, capability brochures, and application guides. These resources provide comprehensive information about our tubing solutions, manufacturing processes, and value-added services.",
    items: [
      { name: "Indiana Tube Product Catalog", placeholder: true },
      { name: "Capabilities Brochure", placeholder: true },
      { name: "Coated Tubing Guide", placeholder: true },
      { name: "Fabricated Assemblies Brochure", placeholder: true },
      { name: "Tube Stocking Program Overview", placeholder: true },
    ],
  },
  {
    id: "technical-specs",
    number: "03",
    title: "Technical Specifications",
    description:
      "Access detailed technical specification sheets for our tubing products. These documents include dimensional tolerances, material properties, coating specifications, and testing parameters.",
    items: [
      { name: "Round Tubing Specifications", placeholder: true },
      { name: "Cut-to-Length Tube Specifications", placeholder: true },
      { name: "Coated Tubing Specifications", placeholder: true },
      { name: "Material & Grade Reference Sheet", placeholder: true },
      { name: "Dimensional Tolerance Guide", placeholder: true },
    ],
  },
  {
    id: "terms",
    number: "04",
    title: "Terms & Conditions",
    description:
      "Review our standard terms and conditions of sale, warranty information, and shipping policies. For questions regarding any of these documents, please contact our sales team.",
    items: [
      { name: "Terms & Conditions of Sale", placeholder: true },
      { name: "Warranty Information", placeholder: true },
      { name: "Shipping & Delivery Policy", placeholder: true },
    ],
  },
];

const Downloads = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <img
          src={heroImage}
          alt="Download information and resources"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container relative z-10">
          <SectionReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Resources
              </span>
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-secondary-foreground mt-3 mb-6 leading-tight">
                Download{" "}
                <span className="text-gradient-orange">Information</span>
              </h1>
              <p className="text-steel-muted text-lg leading-relaxed max-w-2xl mx-auto">
                You can download or request Certifications, Declarations,
                Product Literature, Technical Specifications, or our Terms &
                Conditions:
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Download Sections — alternating dark / light */}
      {downloadSections.map((section, sectionIdx) => {
        const isDark = sectionIdx % 2 === 0;

        return (
          <section
            key={section.id}
            id={section.id}
            className={
              isDark
                ? "bg-steel-gradient py-20 lg:py-24"
                : "py-20 lg:py-24 bg-background"
            }
          >
            <div className="container">
              <SectionReveal>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                  {/* Left: Info */}
                  <div
                    className={
                      sectionIdx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }
                  >
                    <div className="relative">
                      <span
                        className={`font-heading text-8xl lg:text-9xl font-extrabold select-none leading-none ${
                          isDark ? "text-primary/10" : "text-muted/60"
                        }`}
                      >
                        {section.number}
                      </span>
                      <h2
                        className={`font-heading font-extrabold text-3xl lg:text-4xl -mt-6 mb-6 ${
                          isDark ? "text-secondary-foreground" : "text-foreground"
                        }`}
                      >
                        {section.title}
                      </h2>
                    </div>
                    <p
                      className={`text-base lg:text-lg leading-relaxed mb-8 ${
                        isDark ? "text-steel-muted" : "text-muted-foreground"
                      }`}
                    >
                      {section.description}
                    </p>
                    {section.requestUrl && (
                      <Link
                        to={section.requestUrl}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:text-orange-deep transition-colors"
                      >
                        {section.requestLabel}{" "}
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </div>

                  {/* Right: Download list */}
                  <div
                    className={
                      sectionIdx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }
                  >
                    <div
                      className={`rounded-xl overflow-hidden border ${
                        isDark
                          ? "bg-steel-light/40 border-steel-light/30"
                          : "bg-card border-border"
                      }`}
                    >
                      {section.items.map((item, i) => (
                        <button
                          key={item.name}
                          className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left group transition-colors ${
                            i < section.items.length - 1
                              ? isDark
                                ? "border-b border-steel-light/20"
                                : "border-b border-border"
                              : ""
                          } ${
                            isDark
                              ? "hover:bg-steel-light/60"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => {
                            // Placeholder: in production, this would trigger a download
                            alert(
                              `Download placeholder: "${item.name}" — actual file will be uploaded soon.`
                            );
                          }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText
                              className={`h-5 w-5 shrink-0 ${
                                isDark ? "text-primary/70" : "text-primary"
                              }`}
                            />
                            <span
                              className={`font-medium text-sm truncate ${
                                isDark
                                  ? "text-secondary-foreground/90"
                                  : "text-foreground"
                              }`}
                            >
                              {item.name}
                            </span>
                          </div>
                          <Download
                            className={`h-4 w-4 shrink-0 transition-colors ${
                              isDark
                                ? "text-steel-muted group-hover:text-primary"
                                : "text-muted-foreground group-hover:text-primary"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-muted py-20">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mb-6">
              Can't Find What You Need?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Contact our team and we'll provide the specific documentation you
              require for your application.
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

export default Downloads;
