import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { useSiteImages, getImageUrl } from "@/hooks/useSiteImages";
import SEO from "@/components/SEO";

import automotiveFallback from "@/assets/industry-automotive.jpg";
import oilGasFallback from "@/assets/industry-oil-gas.jpg";
import hvacFallback from "@/assets/industry-hvac.jpg";
import heavyEquipFallback from "@/assets/industry-heavy-equip.jpg";
import structuralFallback from "@/assets/industry-structural.jpg";

const industryData = [
  {
    title: "Automotive & Transportation",
    imageKey: "industry-automotive",
    fallback: automotiveFallback,
    description: "Our automotive tubing products are available as coiled, cut to length, and as fabricated assemblies. ITC tubing delivers exceptional value and performance for brake lines, fuel lines, transmission cooler lines, and more.",
    applications: ["A/C lines", "Fuel lines", "Transmission cooler lines", "Power steering lines", "Vapor return lines"],
  },
  {
    title: "Oil & Gas — Energy Services",
    imageKey: "industry-oil-gas",
    fallback: oilGasFallback,
    description: "Indiana Tube Corporation tubing is manufactured to meet rigorous industry standards and the most demanding customer applications in the energy sector. From downhole to surface, ITC delivers.",
    applications: ["Clean Out/Intervention Applications", "Injection tubing", "Capillary tubing", "Cementing", "Velocity Strings", "Water Lift – Pumping Applications"],
  },
  {
    title: "HVAC & Appliance",
    imageKey: "industry-hvac",
    fallback: hvacFallback,
    description: "ITC produces clean, high-quality tubing compatible with R134a and modern refrigerants, suitable for fabrication in the appliance and heating element industries.",
    applications: ["Refrigeration lines", "Heating elements", "Condenser tubing", "Evaporator tubing", "Appliance components", "Hot Water Heater Gas Lines"],
    extraSections: [
      {
        title: "Refrigerants",
        items: ["R32", "R454"],
      },
    ],
  },
  {
    title: "Heavy Equipment — Hydraulic & High Pressure",
    imageKey: "industry-heavy-equip",
    fallback: heavyEquipFallback,
    description: "ITC tubing is manufactured to meet the most demanding hydraulic and high-pressure applications. We are your complete source for high-quality, single wall, induction welded, low carbon steel tubing.",
    applications: ["Hydraulic lines", "High pressure systems", "Construction equipment", "Mining machinery", "Agricultural equipment"],
  },
  {
    title: "Hardware & Structural",
    imageKey: "industry-structural",
    fallback: structuralFallback,
    description: "ITC produces high-quality tubing suitable for fabrication in lawn and garden, structural, furniture, and general fabrication industries. All tubing is high-frequency welded with modern welding technology.",
    applications: ["Lawn & garden equipment", "Furniture frames", "Structural supports", "Display fixtures"],
  },
];

const Industries = () => {
  const { data: images } = useSiteImages();

  return (
    <div>
      <SEO title={"Industries We Serve | Indiana Tube Corporation"} description={"Precision steel tubing for automotive, oil & gas, HVAC, heavy equipment, and hardware/structural applications worldwide."} path={"/industries"} />
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <img
          src={getImageUrl(images, "industry-key", "https://bzcsjbcnrxuqepdhjvym.supabase.co/storage/v1/object/public/site-images/repository/1770852517873-jwuew12an5.png")}
          alt="Precision steel tubing products for diverse industrial applications"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container relative z-10">
          <SectionReveal>
            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Industries</span>
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-secondary-foreground mt-3 mb-6 leading-tight">
                Precision Tubing for <span className="text-gradient-orange">Every Industry</span>
              </h1>
              <p className="text-white text-lg leading-relaxed">
                For over 45 years, Indiana Tube has specialized as a solution provider for standard and custom tubing across the world's most demanding industries.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Industry Sections */}
      <section className="py-20 lg:py-28">
        <div className="container space-y-24">
          {industryData.map((industry, i) => (
            <SectionReveal key={industry.title}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-lg overflow-hidden shadow-industrial bg-white">
                    <img
                      src={getImageUrl(images, industry.imageKey, industry.fallback)}
                      alt={industry.title}
                      className="w-full aspect-[4/3] object-contain"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
                  </div>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-heading font-extrabold text-2xl lg:text-3xl mb-4">{industry.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{industry.description}</p>
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-primary mb-3">Key Applications</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {industry.applications.map((app) => (
                      <li key={app} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {app}
                      </li>
                    ))}
                   </ul>
                  {industry.extraSections?.map((section) => (
                    <div key={section.title}>
                      <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-primary mb-3">
                        {section.title}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link to="/quote" className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:gap-3 transition-all">
                    Request a Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted py-20">
        <div className="container text-center">
          <SectionReveal>
            <h2 className="font-heading font-extrabold text-3xl lg:text-4xl mb-6">Don't See Your Industry?</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Our custom tubing capabilities extend far beyond these core sectors. Let's talk about your specific needs.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Industries;
