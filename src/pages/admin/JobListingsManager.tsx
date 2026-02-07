import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Briefcase, Plus, Edit2, Trash2, Loader2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface JobListing {
  id: string;
  title: string;
  department: string | null;
  location: string;
  employment_type: string;
  shift: string | null;
  description: string;
  requirements: string | null;
  is_active: boolean;
  created_at: string;
}

const emptyForm = {
  title: "",
  department: "",
  location: "Evansville, IN",
  employment_type: "Full-time",
  shift: "",
  description: "",
  requirements: "",
};

const JobListingsManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [listings, setListings] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("job_listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const openNewForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (listing: JobListing) => {
    setForm({
      title: listing.title,
      department: listing.department ?? "",
      location: listing.location,
      employment_type: listing.employment_type,
      shift: listing.shift ?? "",
      description: listing.description,
      requirements: listing.requirements ?? "",
    });
    setEditingId(listing.id);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    const payload = {
      title: form.title,
      department: form.department || null,
      location: form.location,
      employment_type: form.employment_type,
      shift: form.shift || null,
      description: form.description,
      requirements: form.requirements || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("job_listings")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Job listing updated" });
      }
    } else {
      const { error } = await supabase
        .from("job_listings")
        .insert({ ...payload, created_by: user.id });

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Job listing created" });
      }
    }

    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    fetchListings();
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("job_listings").update({ is_active: !current }).eq("id", id);
    fetchListings();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job listing? This cannot be undone.")) return;
    const { error } = await supabase.from("job_listings").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Listing deleted" });
      fetchListings();
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-2xl">Job Listings</h1>
            <p className="text-muted-foreground text-sm">Manage open positions.</p>
          </div>
        </div>
        {!showForm && (
          <Button onClick={openNewForm} className="font-heading font-bold">
            <Plus className="h-4 w-4" /> New Listing
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-card rounded-lg p-6 border border-border shadow-sm mb-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-bold">
              {editingId ? "Edit Listing" : "New Listing"}
            </h3>
            <Button type="button" variant="ghost" size="icon" onClick={() => setShowForm(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="e.g. Production" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Employment Type</Label>
              <select
                value={form.employment_type}
                onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Shift</Label>
              <Input value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} placeholder="e.g. 1st Shift" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={4}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              placeholder="Describe the role, responsibilities, and what a typical day looks like."
            />
          </div>

          <div className="space-y-2">
            <Label>Requirements</Label>
            <textarea
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
              placeholder="List qualifications, experience, or certifications. One per line recommended."
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={saving} className="font-heading font-bold">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {editingId ? "Update" : "Create"} Listing
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Listings table */}
      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Briefcase className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>No job listings yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className={`flex items-start gap-4 p-4 rounded-lg border ${
                listing.is_active ? "bg-card border-border" : "bg-muted/50 border-border/50"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-heading font-bold text-sm">{listing.title}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      listing.is_active
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {listing.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {listing.department && `${listing.department} · `}
                  {listing.location} · {listing.employment_type}
                  {listing.shift && ` · ${listing.shift}`}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => toggleActive(listing.id, listing.is_active)}
                  title={listing.is_active ? "Deactivate" : "Activate"}
                >
                  {listing.is_active ? (
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditForm(listing)}>
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(listing.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListingsManager;
