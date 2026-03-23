import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, ArrowRight, Loader2, Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SectionReveal from "@/components/SectionReveal";

const STEPS = ["Personal Info", "Background", "Employment History", "References", "Review & Sign"];

interface EmploymentEntry {
  company: string;
  title: string;
  start_date: string;
  end_date: string;
  reason_for_leaving: string;
}

interface ReferenceEntry {
  name: string;
  relationship: string;
  phone: string;
}

const emptyJob: EmploymentEntry = { company: "", title: "", start_date: "", end_date: "", reason_for_leaving: "" };
const emptyRef: ReferenceEntry = { name: "", relationship: "", phone: "" };

const ApplyJob = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [jobTitle, setJobTitle] = useState("");
  const [loadingJob, setLoadingJob] = useState(true);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [desiredPay, setDesiredPay] = useState("");
  const [startDate, setStartDate] = useState("");
  const [legallyAuthorized, setLegallyAuthorized] = useState<boolean | null>(null);
  const [felonyHistory, setFelonyHistory] = useState<boolean | null>(null);
  const [felonyExplanation, setFelonyExplanation] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [employmentHistory, setEmploymentHistory] = useState<EmploymentEntry[]>([{ ...emptyJob }]);
  const [references, setReferences] = useState<ReferenceEntry[]>([{ ...emptyRef }]);
  const [signature, setSignature] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      const { data } = await supabase
        .from("job_listings")
        .select("title")
        .eq("id", id)
        .eq("is_active", true)
        .single();

      if (data) setJobTitle(data.title);
      setLoadingJob(false);
    };
    fetchJob();
  }, [id]);

  const addEmployment = () => setEmploymentHistory([...employmentHistory, { ...emptyJob }]);
  const removeEmployment = (i: number) => setEmploymentHistory(employmentHistory.filter((_, idx) => idx !== i));
  const updateEmployment = (i: number, field: keyof EmploymentEntry, value: string) => {
    const updated = [...employmentHistory];
    updated[i] = { ...updated[i], [field]: value };
    setEmploymentHistory(updated);
  };

  const addReference = () => setReferences([...references, { ...emptyRef }]);
  const removeReference = (i: number) => setReferences(references.filter((_, idx) => idx !== i));
  const updateReference = (i: number, field: keyof ReferenceEntry, value: string) => {
    const updated = [...references];
    updated[i] = { ...updated[i], [field]: value };
    setReferences(updated);
  };

  const canProceed = () => {
    if (step === 0) return firstName && lastName && email && phone && address && city && state && zip;
    if (step === 4) return signature.trim().length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    const applicationId = crypto.randomUUID();
    const applicationData = {
      id: applicationId,
      job_listing_id: id || null,
      position_applied: jobTitle || "General Application",
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName || null,
      email,
      phone,
      address,
      city,
      state,
      zip,
      how_heard: howHeard || null,
      desired_pay: desiredPay || null,
      available_start_date: startDate || null,
      legally_authorized: legallyAuthorized,
      felony_history: felonyHistory,
      felony_explanation: felonyExplanation || null,
      education: education || null,
      skills: skills || null,
      employment_history: employmentHistory.filter((e) => e.company) as unknown as import("@/integrations/supabase/types").Json,
      applicant_references: references.filter((r) => r.name) as unknown as import("@/integrations/supabase/types").Json,
      applicant_signature: signature,
      signature_date: new Date().toISOString().slice(0, 10),
    };

    const { error } = await supabase.from("job_applications").insert([applicationData]);

    if (error) {
      toast({ title: "Error submitting application", description: error.message, variant: "destructive" });
      setSubmitting(false);
    } else {
      // Trigger notification (fire and forget)
      supabase.functions.invoke("send-notification", {
        body: {
          type: "job_application",
          record: { id: applicationId, first_name: firstName, last_name: lastName, position_applied: jobTitle || "General Application", email, phone, address, city, state, zip, desired_pay: desiredPay, available_start_date: startDate, education, skills, how_heard: howHeard },
        },
      }).catch((err) => console.error("Notification error:", err));
      setSubmitted(true);
    }
  };

  if (loadingJob) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!jobTitle && id) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-heading font-bold text-xl mb-2">Position Not Found</h2>
        <p className="text-muted-foreground mb-6">This job listing may have been removed.</p>
        <Link to="/careers" className="text-primary font-heading font-bold hover:underline">
          ← Back to Careers
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl mb-2">Application Submitted!</h2>
        <p className="text-muted-foreground max-w-md mb-6">
          Thank you for your interest in joining Indiana Tube Corporation. Our HR
          team will review your application and reach out if there's a match.
        </p>
        <Link to="/careers" className="text-primary font-heading font-bold hover:underline">
          ← Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-steel-gradient py-14 lg:py-20">
        <div className="container">
          <SectionReveal>
            <Link to="/careers" className="inline-flex items-center gap-1 text-steel-muted text-sm hover:text-secondary-foreground transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" /> Back to Careers
            </Link>
            <h1 className="font-heading font-extrabold text-3xl lg:text-4xl text-secondary-foreground leading-tight">
              Apply: <span className="text-gradient-orange">{jobTitle}</span>
            </h1>
          </SectionReveal>
        </div>
      </section>

      {/* Progress */}
      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className={`text-sm ${i === step ? "font-medium" : "text-muted-foreground"}`}>
                  {s}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`w-6 h-px ${i < step ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-10 lg:py-16">
        <div className="container max-w-2xl">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="font-heading font-bold text-xl mb-2">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>First Name *</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Middle Name</Label>
                  <Input value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Street Address *</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>City *</Label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>State *</Label>
                  <Input value={state} onChange={(e) => setState(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>ZIP *</Label>
                  <Input value={zip} onChange={(e) => setZip(e.target.value)} required />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Background */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-heading font-bold text-xl mb-2">Background</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>How did you hear about us?</Label>
                  <Input value={howHeard} onChange={(e) => setHowHeard(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Desired Pay</Label>
                  <Input value={desiredPay} onChange={(e) => setDesiredPay(e.target.value)} placeholder="e.g. $18/hr" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Available Start Date</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Are you legally authorized to work in the United States?</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="authorized" checked={legallyAuthorized === true} onChange={() => setLegallyAuthorized(true)} className="accent-[hsl(var(--primary))]" />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="authorized" checked={legallyAuthorized === false} onChange={() => setLegallyAuthorized(false)} className="accent-[hsl(var(--primary))]" />
                    No
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Have you ever been convicted of a felony?</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="felony" checked={felonyHistory === true} onChange={() => setFelonyHistory(true)} className="accent-[hsl(var(--primary))]" />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="felony" checked={felonyHistory === false} onChange={() => setFelonyHistory(false)} className="accent-[hsl(var(--primary))]" />
                    No
                  </label>
                </div>
              </div>
              {felonyHistory && (
                <div className="space-y-2">
                  <Label>Please explain</Label>
                  <textarea
                    value={felonyExplanation}
                    onChange={(e) => setFelonyExplanation(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label>Education</Label>
                <textarea
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  placeholder="Highest degree, school name, year graduated…"
                />
              </div>
              <div className="space-y-2">
                <Label>Skills & Qualifications</Label>
                <textarea
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  placeholder="List relevant skills, certifications, or licenses…"
                />
              </div>
            </div>
          )}

          {/* Step 2: Employment History */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-heading font-bold text-xl mb-2">Employment History</h2>
              <p className="text-muted-foreground text-sm">List your most recent employers first.</p>
              {employmentHistory.map((entry, i) => (
                <div key={i} className="p-4 border border-border rounded-lg space-y-3 bg-card">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Employer {i + 1}</span>
                    {employmentHistory.length > 1 && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeEmployment(i)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Company</Label>
                      <Input value={entry.company} onChange={(e) => updateEmployment(i, "company", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Job Title</Label>
                      <Input value={entry.title} onChange={(e) => updateEmployment(i, "title", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Start Date</Label>
                      <Input type="date" value={entry.start_date} onChange={(e) => updateEmployment(i, "start_date", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">End Date</Label>
                      <Input type="date" value={entry.end_date} onChange={(e) => updateEmployment(i, "end_date", e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Reason for Leaving</Label>
                    <Input value={entry.reason_for_leaving} onChange={(e) => updateEmployment(i, "reason_for_leaving", e.target.value)} />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addEmployment} className="gap-2">
                <Plus className="h-4 w-4" /> Add Another Employer
              </Button>
            </div>
          )}

          {/* Step 3: References */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-heading font-bold text-xl mb-2">References</h2>
              <p className="text-muted-foreground text-sm">Provide at least one professional reference.</p>
              {references.map((ref, i) => (
                <div key={i} className="p-4 border border-border rounded-lg space-y-3 bg-card">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Reference {i + 1}</span>
                    {references.length > 1 && (
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeReference(i)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Full Name</Label>
                      <Input value={ref.name} onChange={(e) => updateReference(i, "name", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Relationship</Label>
                      <Input value={ref.relationship} onChange={(e) => updateReference(i, "relationship", e.target.value)} placeholder="e.g. Supervisor" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Phone</Label>
                      <Input type="tel" value={ref.phone} onChange={(e) => updateReference(i, "phone", e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addReference} className="gap-2">
                <Plus className="h-4 w-4" /> Add Another Reference
              </Button>
            </div>
          )}

          {/* Step 4: Review & Sign */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="font-heading font-bold text-xl mb-2">Review & Sign</h2>
              <div className="bg-card p-5 rounded-lg border border-border space-y-3 text-sm">
                <p><strong>Name:</strong> {firstName} {middleName && `${middleName} `}{lastName}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Address:</strong> {address}, {city}, {state} {zip}</p>
                <p><strong>Position:</strong> {jobTitle}</p>
                {desiredPay && <p><strong>Desired Pay:</strong> {desiredPay}</p>}
                {startDate && <p><strong>Available:</strong> {startDate}</p>}
              </div>
              <div className="p-5 bg-muted/50 rounded-lg border border-border text-sm text-muted-foreground leading-relaxed">
                I certify that all information provided in this application is true
                and complete. I understand that any false information or omission
                may disqualify me from further consideration for employment and may
                result in my dismissal if discovered at a later date.
              </div>
              <div className="space-y-2">
                <Label>Type your full name as your electronic signature *</Label>
                <Input
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="e.g. John Smith"
                  required
                />
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="gap-2 font-heading font-bold"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="gap-2 font-heading font-bold"
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyJob;
