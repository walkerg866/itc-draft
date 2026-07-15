import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const GeneralInterestForm = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    desired_pay: "",
    available_start_date: "",
    how_heard: "",
    legally_authorized: "" as "" | "yes" | "no",
    education: "",
    roles_interest: "",
    felony_history: "" as "" | "yes" | "no",
    felony_explanation: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!ACCEPTED_TYPES.includes(f.type)) {
      toast.error("Please upload a PDF, DOC, or DOCX file.");
      e.target.value = "";
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10 MB.");
      e.target.value = "";
      return;
    }
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
    if (!emailOk) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    let uploadedResumePath: string | null = null;
    try {
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("resumes")
          .upload(path, file);
        if (uploadErr) throw uploadErr;
        uploadedResumePath = path;
      }

      const applicationId = crypto.randomUUID();
      const { error } = await supabase.from("job_applications").insert({
        id: applicationId,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        position_applied: "General Interest",
        skills: form.roles_interest.trim() || null,
        resume_url: uploadedResumePath,
        address: form.address.trim() || "N/A",
        city: form.city.trim() || "N/A",
        state: form.state.trim() || "N/A",
        zip: form.zip.trim() || "N/A",
        desired_pay: form.desired_pay.trim() || null,
        available_start_date: form.available_start_date || null,
        how_heard: form.how_heard.trim() || null,
        legally_authorized:
          form.legally_authorized === "yes"
            ? true
            : form.legally_authorized === "no"
            ? false
            : null,
        education: form.education.trim() || null,
        felony_history:
          form.felony_history === "yes"
            ? true
            : form.felony_history === "no"
            ? false
            : null,
        felony_explanation:
          form.felony_history === "yes"
            ? form.felony_explanation.trim() || null
            : null,
      } as any);

      if (error) throw error;

      setSubmitted(true);
    } catch (err: any) {
      if (uploadedResumePath) {
        await supabase.storage.from("resumes").remove([uploadedResumePath]).catch(() => {});
      }
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="h-10 w-10 mx-auto mb-3 text-primary" />
        <h3 className="font-heading font-bold text-lg mb-1">Thank You!</h3>
        <p className="text-muted-foreground text-sm">
          Your information has been submitted. We'll reach out if a matching
          opportunity becomes available.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 space-y-5">
      <div className="text-center mb-6">
        <h3 className="font-heading font-bold text-lg">
          Submit Your Resume
        </h3>
        <p className="text-muted-foreground text-sm mt-1">
          Interested in future opportunities? Let us know what roles you're
          looking for and upload your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="gi-first">First Name *</Label>
          <Input
            id="gi-first"
            value={form.first_name}
            onChange={(e) => update("first_name", e.target.value)}
            required
            maxLength={100}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gi-last">Last Name *</Label>
          <Input
            id="gi-last"
            value={form.last_name}
            onChange={(e) => update("last_name", e.target.value)}
            required
            maxLength={100}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gi-email">Email *</Label>
        <Input
          id="gi-email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
          maxLength={255}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gi-phone">Phone *</Label>
        <Input
          id="gi-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          required
          maxLength={20}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gi-address">Street Address</Label>
        <Input
          id="gi-address"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5 sm:col-span-1">
          <Label htmlFor="gi-city">City</Label>
          <Input
            id="gi-city"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            maxLength={100}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gi-state">State</Label>
          <Input
            id="gi-state"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            maxLength={50}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gi-zip">ZIP</Label>
          <Input
            id="gi-zip"
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
            maxLength={20}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="gi-pay">Desired Pay</Label>
          <Input
            id="gi-pay"
            value={form.desired_pay}
            onChange={(e) => update("desired_pay", e.target.value)}
            placeholder="e.g. $22/hr"
            maxLength={50}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gi-start">Available Start Date</Label>
          <Input
            id="gi-start"
            type="date"
            value={form.available_start_date}
            onChange={(e) => update("available_start_date", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gi-how">How Did You Hear About Us?</Label>
        <Input
          id="gi-how"
          value={form.how_heard}
          onChange={(e) => update("how_heard", e.target.value)}
          maxLength={200}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gi-auth">Legally Authorized to Work in the U.S.?</Label>
        <select
          id="gi-auth"
          value={form.legally_authorized}
          onChange={(e) => update("legally_authorized", e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="">Select…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gi-education">Education</Label>
        <Textarea
          id="gi-education"
          placeholder="Highest degree, school, certifications…"
          value={form.education}
          onChange={(e) => update("education", e.target.value)}
          maxLength={1000}
          rows={2}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gi-roles">Roles / Areas of Interest</Label>
        <Textarea
          id="gi-roles"
          placeholder="e.g. Welding, Machine Operation, Quality Inspection…"
          value={form.roles_interest}
          onChange={(e) => update("roles_interest", e.target.value)}
          maxLength={1000}
          rows={3}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gi-resume">Resume (PDF, DOC, DOCX)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="gi-resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary hover:file:bg-primary/20"
          />
        </div>
      </div>

      <Button type="submit" disabled={submitting} className="w-full gap-2">
        {submitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        {submitting ? "Submitting…" : "Submit"}
      </Button>
    </form>
  );
};

export default GeneralInterestForm;
