import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import ValuePropsSection from "@/components/ValuePropsSection";
import HeroSlider from "@/components/HeroSlider";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";
import { useSiteVideos, getVideoUrl } from "@/hooks/useSiteVideos";

// Static fallbacks
import facilityFallback from "@/assets/facility-aerial.jpg";

const impactStatements = [
  {
    headline: "Complete Tubing Solutions.",
    supporting: "From raw coil to finished tube.",
  },
  {
    headline: "Your Specs. Delivered Exactly.",
    supporting: "Industry leading tolerance controls, so your production line never stops.",
  },
  {
    headline: "Proven Reliable. Every Shipment.",
    supporting: "Over 45 years of on-time, in-spec delivery.",
  },
];

const Index = () => {
  const { data: images } = useSiteImages();
  const { data: videos } = useSiteVideos();
  const homepageVideoUrl = getVideoUrl(videos, "homepage-video");

  return (
    <div>
      {/* Hero Section */}
      <HeroSlider />

      {/* Impact Statements */}
      <section className="bg-card border-b border-border">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {impactStatements.map((statement, i) => (
              <SectionReveal key={statement.headline} delay={i * 0.1}>
                <div className="text-center px-4">
                  <h3 className="font-heading font-extrabold text-xl lg:text-2xl text-primary mb-2">
                    {statement.headline}
                  </h3>
                  <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">{statement.supporting}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
      {/* Video Section */}
      {homepageVideoUrl && (
        <section className="bg-background py-12">
          <div className="container max-w-4xl">
            <SectionReveal>
              <div className="rounded-lg overflow-hidden shadow-industrial border border-border">
                <video src={homepageVideoUrl} controls className="w-full aspect-video bg-black" preload="metadata" />
              </div>
            </SectionReveal>
          </div>
        </section>
      )}

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
                <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mt-3 mb-6">
                  Built on Expertise. Driven by Service.
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Indiana Tube Corporation is a diversified solution provider and manufacturer of low carbon mechanical
                  grade welded steel tubing, serving customers worldwide. Our products are used across automotive, heavy
                  truck, energy, HVAC, and structural applications.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We manufacture tubing with or without coatings from .156" to 1.75" diameter, in both standard and
                  metric sizes. Every tube is high-frequency welded with modern steel welding technology, ensuring
                  consistent quality and performance.
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
              Ready to Discuss Your <span className="text-gradient-orange">Tubing Needs?</span>
            </h2>
            <p className="text-steel-muted text-lg max-w-xl mx-auto mb-10">
              Our experienced team is ready to help you find the perfect tubing solution. Get in touch for a custom
              quote today.
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
