import { Phone, Mail, MapPin, Clock } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const Contact = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-steel-gradient py-20 lg:py-28">
        <div className="container">
          <SectionReveal>
            <div className="max-w-2xl">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Contact Us
              </span>
              <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-secondary-foreground mt-3 mb-6 leading-tight">
                Let's Talk{" "}
                <span className="text-gradient-orange">Tubing</span>
              </h1>
              <p className="text-white text-lg leading-relaxed">
                Whether you need a custom quote, product specifications, or
                want to discuss your tubing requirements — our team is ready
                to help.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Info + Portrait Map */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Info */}
            <SectionReveal>
              <div>
                <h2 className="font-heading font-extrabold text-3xl mb-8">
                  Get In Touch
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Indiana+Tube+Corporation,+2100+Lexington+Ave,+Evansville,+IN+47720"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open address in Google Maps"
                      className="w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors"
                    >
                      <MapPin className="h-5 w-5 text-primary" />
                    </a>
                    <div>
                      <h4 className="font-heading font-bold mb-1">Address</h4>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Indiana+Tube+Corporation,+2100+Lexington+Ave,+Evansville,+IN+47720"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        2100 Lexington Avenue
                        <br />
                        Evansville, IN 47720
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <a
                      href="tel:+18124249028"
                      aria-label="Call (812) 424-9028"
                      className="w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors"
                    >
                      <Phone className="h-5 w-5 text-primary" />
                    </a>
                    <div>
                      <h4 className="font-heading font-bold mb-1">Phone</h4>
                      <a
                        href="tel:+18124249028"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        (812) 424-9028
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <a
                      href="mailto:sales@indianatube.com"
                      aria-label="Email sales@indianatube.com"
                      className="w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                    </a>
                    <div>
                      <h4 className="font-heading font-bold mb-1">Email</h4>
                      <a
                        href="mailto:sales@indianatube.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        sales@indianatube.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold mb-1">
                        Business Hours
                      </h4>
                      <p className="text-muted-foreground">
                        Monday – Friday: 8:00 AM – 5:00 PM Central Time
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Portrait Map */}
            <SectionReveal delay={0.2}>
              <div className="rounded-lg overflow-hidden shadow-industrial border border-border aspect-[3/4] w-full">
                <iframe
                  src="https://maps.google.com/maps?q=Indiana+Tube+Corporation,+2100+Lexington+Ave,+Evansville,+IN+47720&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, height: "100%", width: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Indiana Tube Corporation — 2100 Lexington Avenue, Evansville, IN 47720"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
