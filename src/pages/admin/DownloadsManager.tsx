import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  Trash2,
  FileText,
  Plus,
  Download,
  CheckCircle,
  AlertCircle,
  Pencil,
  Eye,
} from "lucide-react";

const SECTIONS = [
  { value: "certifications", label: "Certifications & Declarations" },
  { value: "product-literature", label: "Product Literature" },
  { value: "technical-specs", label: "Technical Specifications" },
  { value: "terms", label: "Terms & Conditions" },
];

interface DownloadRow {
  id: string;
  section: string;
  name: string;
  file_path: string | null;
  file_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const DownloadsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filterSection, setFilterSection] = useState<string>("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<DownloadRow | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newSection, setNewSection] = useState("certifications");
  const [editName, setEditName] = useState("");

  const { data: downloads = [], isLoading } = useQuery({
    queryKey: ["admin-downloads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("downloads")
        .select("*")
        .order("section")
        .order("sort_order");
      if (error) throw error;
      return data as DownloadRow[];
    },
  });

  const addMutation = useMutation({
    mutationFn: async ({
      name,
      section,
    }: {
      name: string;
      section: string;
    }) => {
      const maxOrder =
        downloads
          .filter((d) => d.section === section)
          .reduce((max, d) => Math.max(max, d.sort_order), 0) + 1;
      const { error } = await supabase.from("downloads").insert({
        name,
        section,
        sort_order: maxOrder,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-downloads"] });
      toast({ title: "Download item added" });
      setAddDialogOpen(false);
      setNewName("");
    },
    onError: (err: Error) =>
      toast({
        title: "Error adding item",
        description: err.message,
        variant: "destructive",
      }),
  });

  const renameMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { error } = await supabase
        .from("downloads")
        .update({ name })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-downloads"] });
      toast({ title: "Item renamed" });
      setEditingId(null);
    },
    onError: (err: Error) =>
      toast({
        title: "Error renaming",
        description: err.message,
        variant: "destructive",
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: DownloadRow) => {
      if (item.file_path) {
        await supabase.storage.from("downloads").remove([item.file_path]);
      }
      const { error } = await supabase
        .from("downloads")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-downloads"] });
      toast({ title: "Item deleted" });
    },
    onError: (err: Error) =>
      toast({
        title: "Error deleting",
        description: err.message,
        variant: "destructive",
      }),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("downloads")
        .update({ is_active } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-downloads"] });
    },
    onError: (err: Error) =>
      toast({
        title: "Error toggling visibility",
        description: err.message,
        variant: "destructive",
      }),
  });

  const handleFileUpload = async (
    item: DownloadRow,
    file: File
  ) => {
    const ext = file.name.split(".").pop();
    const filePath = `${item.section}/${item.id}.${ext}`;

    // Remove old file if exists
    if (item.file_path) {
      await supabase.storage.from("downloads").remove([item.file_path]);
    }

    const { error: uploadError } = await supabase.storage
      .from("downloads")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({
        title: "Upload failed",
        description: uploadError.message,
        variant: "destructive",
      });
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("downloads").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("downloads")
      .update({ file_path: filePath, file_url: publicUrl })
      .eq("id", item.id);

    if (updateError) {
      toast({
        title: "Error saving file reference",
        description: updateError.message,
        variant: "destructive",
      });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["admin-downloads"] });
    toast({ title: "File uploaded successfully" });
  };

  const removeFile = async (item: DownloadRow) => {
    if (!item.file_path) return;
    await supabase.storage.from("downloads").remove([item.file_path]);
    await supabase
      .from("downloads")
      .update({ file_path: null, file_url: null })
      .eq("id", item.id);
    queryClient.invalidateQueries({ queryKey: ["admin-downloads"] });
    toast({ title: "File removed" });
  };

  const filtered =
    filterSection === "all"
      ? downloads
      : downloads.filter((d) => d.section === filterSection);

  const grouped = SECTIONS.map((s) => ({
    ...s,
    items: filtered.filter((d) => d.section === s.value),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">
            Downloads Manager
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Upload and manage downloadable files for the public Downloads page.
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={filterSection} onValueChange={setFilterSection}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sections</SelectItem>
              {SECTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Download Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div>
                  <Label>Section</Label>
                  <Select value={newSection} onValueChange={setNewSection}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTIONS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Name</Label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. ISO 9001:2015 Certificate"
                  />
                </div>
                <Button
                  className="w-full"
                  disabled={!newName.trim()}
                  onClick={() =>
                    addMutation.mutate({
                      name: newName.trim(),
                      section: newSection,
                    })
                  }
                >
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : grouped.length === 0 ? (
        <p className="text-muted-foreground">No download items found.</p>
      ) : (
        grouped.map((group) => (
          <div key={group.value} className="space-y-2">
            <h2 className="font-heading font-bold text-lg">{group.label}</h2>
            <div className="rounded-lg border border-border overflow-hidden">
              {group.items.map((item, i) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-4 py-3 ${
                    i < group.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <FileText className={`h-5 w-5 shrink-0 ${(item as any).is_active === false ? 'text-muted-foreground' : 'text-primary'}`} />

                  {editingId === item.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        onClick={() =>
                          renameMutation.mutate({
                            id: item.id,
                            name: editName.trim(),
                          })
                        }
                        disabled={!editName.trim()}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-sm truncate block">
                        {item.name}
                      </span>
                    </div>
                  )}

                  {/* Active toggle */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Switch
                      checked={(item as any).is_active !== false}
                      onCheckedChange={(checked) =>
                        toggleActiveMutation.mutate({ id: item.id, is_active: checked })
                      }
                      title={`${(item as any).is_active !== false ? 'Active' : 'Inactive'} — click to toggle`}
                    />
                    <span className={`text-xs ${(item as any).is_active !== false ? 'text-primary' : 'text-muted-foreground'}`}>
                      {(item as any).is_active !== false ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Status indicator */}
                  {item.file_url ? (
                    <span className="flex items-center gap-1 text-xs text-primary shrink-0">
                      <CheckCircle className="h-3.5 w-3.5" /> File uploaded
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                      <AlertCircle className="h-3.5 w-3.5" /> No file
                    </span>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    {item.file_url && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          title="Preview"
                          onClick={() => setPreviewItem(item)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          asChild
                          title="Download"
                        >
                          <a
                            href={item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      </>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      title="Rename"
                      onClick={() => {
                        setEditingId(item.id);
                        setEditName(item.name);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    {/* Upload / Replace */}
                    <Button
                      size="icon"
                      variant="ghost"
                      title={item.file_url ? "Replace file" : "Upload file"}
                      className="relative"
                      asChild
                    >
                      <label className="cursor-pointer">
                        <Upload className="h-4 w-4" />
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(item, file);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </Button>

                    {item.file_url && (
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Remove file"
                        onClick={() => removeFile(item)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      title="Delete item"
                      onClick={() => {
                        if (
                          confirm(
                            `Delete "${item.name}"? This cannot be undone.`
                          )
                        ) {
                          deleteMutation.mutate(item);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Document Preview Dialog */}
      <Dialog open={!!previewItem} onOpenChange={(open) => !open && setPreviewItem(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="truncate pr-8">{previewItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 min-h-0 mt-2">
            {previewItem?.file_url && (
              previewItem.file_url.toLowerCase().match(/\.(pdf)(\?|$)/) ? (
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent(previewItem.file_url)}&embedded=true`}
                  className="w-full h-[60vh] rounded-md border border-border"
                  title={`Preview of ${previewItem.name}`}
                />
              ) : previewItem.file_url.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp|svg)(\?|$)/) ? (
                <div className="flex items-center justify-center h-[60vh] bg-muted/30 rounded-md border border-border overflow-hidden">
                  <img
                    src={previewItem.file_url}
                    alt={previewItem.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[60vh] bg-muted/30 rounded-md border border-border text-muted-foreground gap-3">
                  <FileText className="h-12 w-12 opacity-40" />
                  <p className="text-sm">Preview not available for this file type.</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={previewItem.file_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" /> Download to view
                    </a>
                  </Button>
                </div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DownloadsManager;
