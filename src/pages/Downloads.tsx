import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import DownloadListCard from "@/components/DownloadListCard";
import { useDownloads } from "@/hooks/useDownloads";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";
import heroFallback from "@/assets/hero-steel-tubes.jpg";
import SEO from "@/components/SEO";

const SECTION_META = [
  {
    id: "certifications",
    number: "01",
    title: "Certifications & Declarations",
    description:
      "Indiana Tube Corporation QMS is designed to ensure conformance to rigid customer requirements through continuous improvement actions to sustain and increase product efficiency and performance for our customers. We are committed to a sustainable future and the environmental well-being of the communities we serve.",
    requestUrl: "/quote",
    requestLabel: "Request Specific Declaration Documentation",
  },
  {
    id: "product-literature",
    number: "02",
    title: "Product Literature",
    description:
      "Download our latest product catalogs, capability brochures, and application guides. These resources provide comprehensive information about our tubing solutions, manufacturing processes, and value-added services.",
  },
  {
    id: "technical-specs",
    number: "03",
    title: "Technical Specifications",
    description:
      "Access detailed technical specification sheets for our tubing products. These documents include dimensional tolerances, material properties, coating specifications, and testing parameters.",
  },
  {
    id: "terms",
    number: "04",
    title: "Terms & Conditions",
    description:
      "Review our standard terms and conditions of sale, warranty information, and shipping policies. For questions regarding any of these documents, please contact our sales team.",
  },
];

const Downloads = () => {
  const { data: downloads = [] } = useDownloads();
  const { data: images } = useSiteImages();

  const sections = SECTION_META.map((meta) => ({
    ...meta,
    items: downloads.filter((d) => d.section === meta.id),
  }));

  return (
    <div>
      <SEO title={"Downloads: Certifications & Data Sheets | Indiana Tube"} description={"Download product data sheets, certifications, quality declarations, and technical documents from Indiana Tube Corporation."} path={"/downloads"} />
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <img
          src={getImageUrl(images, "hero-steel-tubes", heroFallback)}
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
              <p className="text-white text-lg leading-relaxed max-w-2xl mx-auto">
                You can download or request Certifications, Declarations,
                Product Literature, Technical Specifications, or our Terms &
                Conditions:
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Download Sections — alternating dark / light */}
      {sections.map((section, sectionIdx) => {
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
                          isDark
                            ? "text-secondary-foreground"
                            : "text-foreground"
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
                    {section.items.length > 0 ? (
                      <DownloadListCard
                        items={section.items}
                        isDark={isDark}
                      />
                    ) : (
                      <p
                        className={`text-sm italic ${
                          isDark
                            ? "text-steel-muted"
                            : "text-muted-foreground"
                        }`}
                      >
                        No documents available yet.
                      </p>
                    )}
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
