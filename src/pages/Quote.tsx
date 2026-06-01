import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SectionReveal from "@/components/SectionReveal";

const Quote = () => {
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

  const inputClass =
    "w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow";

  return (
    <div>
      {/* Thin Hero */}
      <section className="bg-steel-gradient py-12 lg:py-16">
        <div className="container">
          <SectionReveal>
            <div className="max-w-3xl">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Get a Custom Quote
              </span>
              <h1 className="font-heading font-extrabold text-3xl lg:text-4xl text-secondary-foreground mt-2 mb-3 leading-tight">
                Request a <span className="text-gradient-orange">Quote</span>
              </h1>
              <p className="text-white text-base lg:text-lg leading-relaxed">
                Tell us about your tubing requirements and our team will
                respond within one business day.
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <SectionReveal>
            <div className="max-w-6xl mx-auto bg-card rounded-lg p-8 lg:p-12 shadow-industrial border border-border">
              {submitted ? (
                <div className="text-center py-16">
                  <CheckCircle2 className="h-14 w-14 mx-auto mb-4 text-primary" />
                  <h3 className="font-heading font-bold text-3xl mb-3">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                    Your inquiry has been submitted. Our team will contact you
                    within one business day.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.first_name}
                        onChange={(e) => update("first_name", e.target.value)}
                        className={inputClass}
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
                        className={inputClass}
                        placeholder="Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        className={inputClass}
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className={inputClass}
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
                        className={inputClass}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Industry
                      </label>
                      <select
                        value={form.industry}
                        onChange={(e) => update("industry", e.target.value)}
                        className={inputClass}
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
                  </div>

                  {/* Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Diameter(s)
                      </label>
                      <input
                        type="text"
                        value={form.diameters}
                        onChange={(e) => update("diameters", e.target.value)}
                        className={inputClass}
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
                        className={inputClass}
                        placeholder="e.g. 50,000 feet"
                      />
                    </div>
                    <div className="hidden md:block" />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How Can We Help? *
                    </label>
                    <textarea
                      required
                      rows={6}
                      maxLength={5000}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your tubing requirements, quantities, specifications, or any questions you have..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-10 py-3.5 bg-primary text-primary-foreground font-heading font-bold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                      {submitting ? "Submitting…" : "Submit Inquiry"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
};

export default Quote;
