import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SectionReveal from "@/components/SectionReveal";

const Contact = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    diameters: "",
    annual_volume: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.from("quote_requests" as any).insert({
        id,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        company: form.company.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        industry: form.industry || null,
        diameters: form.diameters.trim() || null,
        annual_volume: form.annual_volume.trim() || null,
        message: form.message.trim(),
      } as any);

      if (error) throw error;

      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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

                {/* Map embed */}
                <div className="mt-10 rounded-lg overflow-hidden shadow-industrial border border-border">
                  <iframe
                    src="https://maps.google.com/maps?q=Indiana+Tube+Corporation,+2100+Lexington+Ave,+Evansville,+IN+47720&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Indiana Tube Corporation — 2100 Lexington Avenue, Evansville, IN 47720"
                  />
                </div>
              </div>
            </SectionReveal>

            {/* Contact Form */}
            <SectionReveal delay={0.2}>
              <div className="bg-card rounded-lg p-8 lg:p-10 shadow-industrial border border-border">
                {submitted ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-heading font-bold text-2xl mb-2">
                      Thank You!
                    </h3>
                    <p className="text-muted-foreground">
                      Your inquiry has been submitted. Our team will contact you
                      within one business day.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-heading font-bold text-2xl mb-2">
                      Request a Quote
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Fill out the form below and our team will get back to you
                      within one business day.
                    </p>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={form.first_name}
                            onChange={(e) => update("first_name", e.target.value)}
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
                            value={form.last_name}
                            onChange={(e) => update("last_name", e.target.value)}
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
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
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
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
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
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Industry
                        </label>
                        <select
                          value={form.industry}
                          onChange={(e) => update("industry", e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                        >
                          <option value="">Select an industry</option>
                          <option value="Automotive & Transportation">
                            Automotive & Transportation
                          </option>
                          <option value="Oil & Gas — Energy Services">
                            Oil & Gas — Energy Services
                          </option>
                          <option value="HVAC & Appliance">HVAC & Appliance</option>
                          <option value="Heavy Equipment & Hydraulics">
                            Heavy Equipment & Hydraulics
                          </option>
                          <option value="Hardware & Structural">
                            Hardware & Structural
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Diameter(s)
                          </label>
                          <input
                            type="text"
                            value={form.diameters}
                            onChange={(e) => update("diameters", e.target.value)}
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
                            value={form.annual_volume}
                            onChange={(e) => update("annual_volume", e.target.value)}
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
                          value={form.message}
                          onChange={(e) => update("message", e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                          placeholder="Tell us about your tubing requirements, quantities, specifications, or any questions you have..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-7 py-3.5 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                        {submitting ? "Submitting…" : "Submit Inquiry"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
