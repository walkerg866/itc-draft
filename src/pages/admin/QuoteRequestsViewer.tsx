import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquareQuote, ChevronDown, ChevronUp, Loader2, Download, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

interface QuoteRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  industry: string | null;
  diameters: string | null;
  annual_volume: string | null;
  message: string;
  submitted_at: string;
}

const QuoteRequestsViewer = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (!error && data) {
        setQuotes(data as QuoteRequest[]);
      }
      setLoading(false);
    };
    fetchQuotes();
  }, []);

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  const exportCSV = () => {
    if (quotes.length === 0) return;
    const headers = ["Name", "Email", "Phone", "Company", "Industry", "Diameters", "Annual Volume", "Message", "Submitted"];
    const rows = quotes.map((q) => [
      `${q.first_name} ${q.last_name}`,
      q.email,
      q.phone || "",
      q.company || "",
      q.industry || "",
      q.diameters || "",
      q.annual_volume || "",
      q.message,
      new Date(q.submitted_at).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = (q: QuoteRequest) => {
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

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Quote Request", margin, y);
    y += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(`Submitted: ${new Date(q.submitted_at).toLocaleDateString()}`, margin, y);
    doc.setTextColor(0);
    y += 12;

    addText("Name:", `${q.first_name} ${q.last_name}`);
    addText("Email:", q.email);
    addText("Phone:", q.phone);
    addText("Company:", q.company);
    addText("Industry:", q.industry);
    addText("Diameters:", q.diameters);
    addText("Annual Volume:", q.annual_volume);
    y += 4;
    addText("Message:", q.message);

    doc.save(`quote-${q.first_name}-${q.last_name}.pdf`);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquareQuote className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl">Quote Requests</h1>
            <p className="text-muted-foreground text-sm">
              {quotes.length} submission{quotes.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {quotes.length > 0 && (
          <Button variant="outline" onClick={exportCSV} className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquareQuote className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>No quote requests received yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {quotes.map((q) => (
            <div key={q.id} className="bg-card rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => toggle(q.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-heading font-bold text-sm">
                      {q.first_name} {q.last_name}
                    </h4>
                    {q.company && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {q.company}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {q.email} · Submitted {new Date(q.submitted_at).toLocaleDateString()}
                  </p>
                </div>
                {expandedId === q.id ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {expandedId === q.id && (
                <div className="px-4 pb-4 border-t border-border pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <Field label="Name" value={`${q.first_name} ${q.last_name}`} />
                    <Field label="Email" value={q.email} />
                    <Field label="Phone" value={q.phone} />
                    <Field label="Company" value={q.company} />
                    <Field label="Industry" value={q.industry} />
                    <Field label="Diameters" value={q.diameters} />
                    <Field label="Annual Volume" value={q.annual_volume} />
                    <div className="sm:col-span-2">
                      <Field label="Message" value={q.message} />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => downloadPDF(q)}>
                      <FileDown className="h-4 w-4" /> Download PDF
                    </Button>
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

export default QuoteRequestsViewer;
