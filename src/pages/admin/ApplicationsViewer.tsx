import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import { FileText, ChevronDown, ChevronUp, Loader2, Download, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface JobApplication {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  position_applied: string;
  how_heard: string | null;
  desired_pay: string | null;
  available_start_date: string | null;
  legally_authorized: boolean | null;
  felony_history: boolean | null;
  felony_explanation: string | null;
  education: string | null;
  skills: string | null;
  employment_history: unknown[];
  applicant_references: unknown[];
  applicant_signature: string | null;
  signature_date: string | null;
  submitted_at: string;
  job_listing_id: string | null;
  resume_url: string | null;
}

const ApplicationsViewer = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const openId = searchParams.get("open");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data, error } = await supabase
          .from("job_applications")
          .select("*")
          .order("submitted_at", { ascending: false });

        if (error) throw error;
        setApplications((data ?? []) as unknown as JobApplication[]);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  useEffect(() => {
    if (openId && applications.some((a) => a.id === openId)) {
      setExpandedId(openId);
      requestAnimationFrame(() => {
        document.getElementById(`app-${openId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [openId, applications]);


  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const exportCSV = () => {
    if (applications.length === 0) return;

    const headers = [
      "Name", "Email", "Phone", "Address", "Position", "Submitted",
    ];
    const rows = applications.map((a) => [
      `${a.first_name} ${a.last_name}`,
      a.email,
      a.phone,
      `${a.address}, ${a.city}, ${a.state} ${a.zip}`,
      a.position_applied,
      new Date(a.submitted_at).toLocaleDateString(),
    ]);

    const safeCell = (v: unknown) => {
      const s = String(v ?? "");
      const neutralized = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s;
      return `"${neutralized.replace(/"/g, '""')}"`;
    };
    const csv = [headers, ...rows].map((r) => r.map(safeCell).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = (app: JobApplication) => {
    const doc = new jsPDF();
    const margin = 20;
    let y = margin;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxWidth = pageWidth - margin * 2;

    const addText = (label: string, value: string | null | undefined) => {
      if (!value) return;
      if (y > 270) { doc.addPage(); y = margin; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(label, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(value, maxWidth - 45);
      doc.text(lines, margin + 45, y);
      y += Math.max(lines.length * 5, 6) + 2;
    };

    const addSection = (title: string) => {
      if (y > 260) { doc.addPage(); y = margin; }
      y += 4;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(title, margin, y);
      y += 2;
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;
    };

    // Header
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Job Application", margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`Submitted: ${new Date(app.submitted_at).toLocaleDateString()}`, margin, y);
    doc.setTextColor(0);
    y += 10;

    addSection("Personal Information");
    addText("Name:", `${app.first_name} ${app.middle_name ? app.middle_name + " " : ""}${app.last_name}`);
    addText("Email:", app.email);
    addText("Phone:", app.phone);
    addText("Address:", `${app.address}, ${app.city}, ${app.state} ${app.zip}`);

    addSection("Position Details");
    addText("Position:", app.position_applied);
    addText("Desired Pay:", app.desired_pay);
    addText("Start Date:", app.available_start_date);
    addText("How Heard:", app.how_heard);
    addText("Authorized:", app.legally_authorized === null ? null : app.legally_authorized ? "Yes" : "No");
    addText("Felony:", app.felony_history === null ? null : app.felony_history ? "Yes" : "No");
    if (app.felony_explanation) addText("Explanation:", app.felony_explanation);

    if (app.education || app.skills) {
      addSection("Education & Skills");
      addText("Education:", app.education);
      addText("Skills:", app.skills);
    }

    if (Array.isArray(app.employment_history) && app.employment_history.length > 0) {
      addSection("Employment History");
      app.employment_history.forEach((job: any, i: number) => {
        if (y > 260) { doc.addPage(); y = margin; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`${i + 1}. ${job.company || "N/A"} — ${job.title || "N/A"}`, margin, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(`${job.start_date || "?"} to ${job.end_date || "Present"}${job.reason_for_leaving ? ` · Left: ${job.reason_for_leaving}` : ""}`, margin + 5, y);
        y += 7;
      });
    }

    if (Array.isArray(app.applicant_references) && app.applicant_references.length > 0) {
      addSection("References");
      app.applicant_references.forEach((ref: any, i: number) => {
        if (y > 260) { doc.addPage(); y = margin; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(`${i + 1}. ${ref.name || "N/A"}`, margin, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.text(`${ref.relationship || ""} ${ref.phone ? `· ${ref.phone}` : ""}`, margin + 5, y);
        y += 7;
      });
    }

    if (app.applicant_signature) {
      addSection("Signature");
      addText("Signed:", `${app.applicant_signature}${app.signature_date ? ` on ${app.signature_date}` : ""}`);
    }

    doc.save(`application-${app.first_name}-${app.last_name}.pdf`);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl">Applications</h1>
            <p className="text-muted-foreground text-sm">
              {applications.length} submission{applications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {applications.length > 0 && (
          <Button variant="outline" onClick={exportCSV} className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>No applications received yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app.id} id={`app-${app.id}`} className="bg-card rounded-lg border border-border overflow-hidden scroll-mt-20">
              <button
                onClick={() => toggle(app.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-heading font-bold text-sm">
                      {app.first_name} {app.last_name}
                    </h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {app.position_applied}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {app.email} · Submitted {new Date(app.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                {expandedId === app.id ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {expandedId === app.id && (
                <div className="px-4 pb-4 border-t border-border pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <Field label="Full Name" value={`${app.first_name} ${app.middle_name ? app.middle_name + " " : ""}${app.last_name}`} />
                    <Field label="Email" value={app.email} />
                    <Field label="Phone" value={app.phone} />
                    <Field label="Address" value={`${app.address}, ${app.city}, ${app.state} ${app.zip}`} />
                    <Field label="Position" value={app.position_applied} />
                    <Field label="Desired Pay" value={app.desired_pay} />
                    <Field label="Start Date" value={app.available_start_date} />
                    <Field label="How Heard" value={app.how_heard} />
                    <Field label="Legally Authorized" value={app.legally_authorized === null ? null : app.legally_authorized ? "Yes" : "No"} />
                    <Field label="Felony History" value={app.felony_history === null ? null : app.felony_history ? "Yes" : "No"} />
                    {app.felony_explanation && (
                      <div className="sm:col-span-2">
                        <Field label="Felony Explanation" value={app.felony_explanation} />
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <Field label="Education" value={app.education} />
                    </div>
                    <div className="sm:col-span-2">
                      <Field label="Skills" value={app.skills} />
                    </div>
                  </div>

                  {Array.isArray(app.employment_history) && app.employment_history.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-heading font-bold text-sm mb-2">Employment History</h5>
                      <div className="space-y-2">
                        {app.employment_history.map((job: any, i: number) => (
                          <div key={i} className="p-3 bg-muted/50 rounded-md text-sm">
                            <p className="font-medium">{job.company || "N/A"} — {job.title || "N/A"}</p>
                            <p className="text-muted-foreground text-xs">
                              {job.start_date || "?"} to {job.end_date || "Present"}
                              {job.reason_for_leaving && ` · Left: ${job.reason_for_leaving}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(app.applicant_references) && app.applicant_references.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-heading font-bold text-sm mb-2">References</h5>
                      <div className="space-y-2">
                        {app.applicant_references.map((ref: any, i: number) => (
                          <div key={i} className="p-3 bg-muted/50 rounded-md text-sm">
                            <p className="font-medium">{ref.name || "N/A"}</p>
                            <p className="text-muted-foreground text-xs">
                              {ref.relationship || ""} {ref.phone ? `· ${ref.phone}` : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {app.applicant_signature && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Signed: {app.applicant_signature}
                        {app.signature_date && ` on ${app.signature_date}`}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-border flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => downloadPDF(app)}
                    >
                      <FileDown className="h-4 w-4" /> Download PDF
                    </Button>

                    {app.resume_url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={async () => {
                          try {
                            const { data, error } = await supabase.storage
                              .from("resumes")
                              .download(app.resume_url!);
                            if (error || !data) {
                              alert("Could not download resume.");
                              return;
                            }
                            const filename = `resume-${app.first_name}-${app.last_name}-${app.resume_url!.split("/").pop()}`;
                            const url = URL.createObjectURL(data);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            URL.revokeObjectURL(url);
                          } catch (e) {
                            alert("Could not download resume.");
                          }
                        }}
                      >
                        <Download className="h-4 w-4" /> Download Resume
                      </Button>

                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div>
    <dt className="text-xs text-muted-foreground">{label}</dt>
    <dd className="font-medium">{value || "—"}</dd>
  </div>
);

export default ApplicationsViewer;
