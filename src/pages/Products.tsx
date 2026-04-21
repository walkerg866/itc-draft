import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { useSiteImages, getImageUrl, getImageAlt } from "@/hooks/useSiteImages";
import heroFallback from "@/assets/hero-steel-tubes.jpg";

const productData = [
  {
    title: "Steel Types & Capabilities",
    imageKey: "product-steel-types",
    description:
      "Indiana Tube uses the highest-quality low-carbon steel that meets our proprietary specification. Our steel tubing products are manufactured to tolerances which are more than twice as tight as the industry standards, making us the ideal choice for customers with the most exacting requirements for the most demanding applications.",
    features: [
      "Low Carbon Grades (CS, DS, DDS, EDDS, HSLA, DP)",
      "HSLA Grades (50, 60, 70 & 80)",
      "A606 Type 4 Grade 70/80",
      "Coatings (Copper, Nickel, Aluminized)",
    ],
    extraSections: [
      {
        title: "Industry Standard Specifications",
        items: [
          "SAE J526",
          "SAE J356",
          "ASTM 513 Type 1",
          "ASTM 513 Type 2",
          "STKM 11A",
          "EN10305-3",
          "GM-124M",
          "JIS 3445",
        ],
      },
      {
        title: "Size Ranges",
        items: [
          "Outside Diameter Range: 0.156\" (3.97mm) to 1.750\" (44.45mm)",
          "Wall Thickness Range: 0.022\" (.559mm) to 0.109\" (2.77mm)",
        ],
        note: "Not All Wall Thicknesses are available in all Outside Diameters",
      },
    ],
  },
  {
    title: "CT Spooled Tube",
    imageKey: "product-ct-spooled",
    description:
      "Indiana Tube manufactures coiled tubing in a range of 0.625\" to 1.750\" outside diameters and .065\" to 0.109\" wall thickness, with premium A606 carbon steel to provide extended fatigue life for well applications.",
    features: [
      "Premium A606 steel",
      "Extended fatigue life",
      "Outside Diameters from 0.625\" to 1.750\"",
      "Wall Thicknesses from .065\" to 0.109\"",
    ],
  },
  {
    title: "Precision & Random Cut Length Tubing",
    imageKey: "product-cut-length",
    description:
      "Indiana Tube provides solutions for mill direct cut length, random cut lengths, and precision cut lengths.",
    features: [
      "Mill direct cut length",
      "Random cut lengths",
      "Precision cut lengths",
      "Square cut & brush deburr",
      "Gauge pin testing",
    ],
  },
  {
    title: "Coiled Tubing",
    imageKey: "product-coiled",
    description:
      "Indiana Tube manufactures the longest small diameter coiled tube in the industry utilizing our custom level wound coiling process. Our product quality, weld seam control, and on time delivery is unmatched in our industry.",
    features: [
      "Level wound coiling",
      "Eddy current testing",
      "Burst pressure testing",
      "Copper flash & nickel coatings",
      "Annealed & un-annealed",
    ],
  },
  {
    title: "Galfan® & Other Enhancement Coatings",
    imageKey: "product-galfan",
    description:
      "Indiana Tube offers a variety of corrosion resistant and performance enhanced tube coatings. Our premier Galfan® coated tubing is a proven cost-effective long-term corrosion resistance solution as compared to high-cost tubing manufactured with copper, stainless steel, or aluminum. Our Galfan® coating is continuously tested beyond 4,000 hours.",
    features: [
      "Galfan® coating",
      "4,000+ hours corrosion testing",
      "Cost-effective alternative",
      "Performance enhanced coatings",
    ],
  },
];

const Products = () => {
  const { data: images } = useSiteImages();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <img
          src={getImageUrl(images, "product-image", "https://bzcsjbcnrxuqepdhjvym.supabase.co/storage/v1/object/public/site-images/repository/1770852586056-qeq1wk5h2fh.png")}
          alt={getImageAlt(images, "product-image", "Steel tubing products")}
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
              <p className="text-white text-lg leading-relaxed">
                Indiana Tube is a solution provider for a wide range of precision
                custom tubing products. We produce tubing from .156" to 1.75"
                diameter, in both standard and metric sizes.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Product Sections */}
      <section className="py-20 lg:py-28">
        <div className="container space-y-24">
          {productData.map((product, i) => (
            <SectionReveal key={product.title}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-lg overflow-hidden shadow-industrial bg-white">
                    <img
                      src={getImageUrl(images, product.imageKey, heroFallback)}
                      alt={getImageAlt(images, product.imageKey, product.title)}
                      className="w-full aspect-[4/3] object-contain"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent" />
                  </div>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <h2 className="font-heading font-extrabold text-2xl lg:text-3xl mb-4">
                    {product.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-primary mb-3">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                   </ul>
                  {product.extraSections?.map((section) => (
                    <div key={section.title}>
                      <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-primary mb-3">
                        {section.title}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {section.note && (
                        <p className="text-sm italic text-muted-foreground mb-8">
                          ({section.note})
                        </p>
                      )}
                    </div>
                  ))}
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-2 text-primary font-heading font-bold hover:gap-3 transition-all"
                  >
                    Request a Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
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
