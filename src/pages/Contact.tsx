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
              <p className="text-steel-muted text-lg leading-relaxed">
                Whether you need a custom quote, product specifications, or
                want to discuss your tubing requirements — our team is ready
                to help.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <SectionReveal>
              <div>
                <h2 className="font-heading font-extrabold text-3xl mb-8">
                  Get In Touch
                </h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold mb-1">Address</h4>
                      <p className="text-muted-foreground">
                        2100 Lexington Avenue
                        <br />
                        Evansville, IN 47720
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
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
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
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
                        Monday – Friday: 8:00 AM – 5:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map embed placeholder */}
                <div className="mt-10 rounded-lg overflow-hidden shadow-industrial border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.8!2d-87.5714!3d37.9718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU4JzE4LjUiTiA4N8KwMzQnMTcuMCJX!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Indiana Tube Corporation location"
                  />
                </div>
              </div>
            </SectionReveal>

            {/* Contact Form */}
            <SectionReveal delay={0.2}>
              <div className="bg-card rounded-lg p-8 lg:p-10 shadow-industrial border border-border">
                <h3 className="font-heading font-bold text-2xl mb-2">
                  Request a Quote
                </h3>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and our team will get back to you
                  within one business day.
                </p>

                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Form submission will be handled when backend is connected
                    alert(
                      "Thank you for your inquiry! Our team will contact you shortly."
                    );
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      placeholder="Your Company"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Industry
                    </label>
                    <select className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow">
                      <option value="">Select an industry</option>
                      <option value="automotive">
                        Automotive & Transportation
                      </option>
                      <option value="oil-gas">
                        Oil & Gas — Energy Services
                      </option>
                      <option value="hvac">HVAC & Appliance</option>
                      <option value="heavy-equip">
                        Heavy Equipment & Hydraulics
                      </option>
                      <option value="structural">
                        Hardware & Structural
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Diameter(s)
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        placeholder='e.g. 1/2", 3/4", 1"'
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Annual Purchase Volume
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        placeholder="e.g. 50,000 feet or 10,000 units"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How Can We Help? *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                      placeholder="Tell us about your tubing requirements, quantities, specifications, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-7 py-3.5 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
