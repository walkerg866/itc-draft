import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Pencil, Copy, Check } from "lucide-react";

interface RepoImage {
  id: string;
  name: string;
  file_path: string;
  url: string;
  alt_text: string | null;
  created_at: string;
}

const ImageRepositoryManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [altText, setAltText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data: images, isLoading } = useQuery({
    queryKey: ["image-repository"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("image_repository")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as RepoImage[];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file || !name.trim()) throw new Error("Name and file required");
      setUploading(true);
      const ext = file.name.split(".").pop();
      const path = `repository/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);

      const { error: dbError } = await supabase.from("image_repository").insert({
        name: name.trim(),
        file_path: path,
        url: urlData.publicUrl,
        alt_text: altText.trim() || null,
      });
      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image-repository"] });
      setDialogOpen(false);
      setName("");
      setAltText("");
      setFile(null);
      setUploading(false);
      toast({ title: "Image uploaded" });
    },
    onError: (err: any) => {
      setUploading(false);
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (img: RepoImage) => {
      await supabase.storage.from("site-images").remove([img.file_path]);
      const { error } = await supabase.from("image_repository").delete().eq("id", img.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image-repository"] });
      toast({ title: "Image deleted" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, name, alt_text }: { id: string; name: string; alt_text: string | null }) => {
      const { error } = await supabase.from("image_repository").update({ name, alt_text }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image-repository"] });
      setEditingId(null);
      toast({ title: "Image updated" });
    },
  });

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Image Repository</h1>
          <p className="text-muted-foreground text-sm mt-1">Upload and manage images for use across the site.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Upload Image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <label className="text-sm font-medium">Name *</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Factory floor photo" />
              </div>
              <div>
                <label className="text-sm font-medium">Alt Text</label>
                <Input value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image" />
              </div>
              <div>
                <label className="text-sm font-medium">Image File *</label>
                <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </div>
              <Button
                className="w-full"
                disabled={!file || !name.trim() || uploading}
                onClick={() => uploadMutation.mutate()}
              >
                {uploading ? "Uploading…" : "Upload"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : !images?.length ? (
        <p className="text-muted-foreground">No images yet. Upload your first image above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="aspect-video bg-muted">
                <img src={img.url} alt={img.alt_text || img.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 space-y-2">
                {editingId === img.id ? (
                  <>
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" className="text-sm" />
                    <Input value={editAlt} onChange={(e) => setEditAlt(e.target.value)} placeholder="Alt text" className="text-sm" />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => updateMutation.mutate({ id: img.id, name: editName, alt_text: editAlt || null })}>Save</Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-medium text-sm truncate">{img.name}</p>
                    {img.alt_text && <p className="text-xs text-muted-foreground truncate">{img.alt_text}</p>}
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => copyUrl(img.url, img.id)}>
                        {copiedId === img.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => { setEditingId(img.id); setEditName(img.name); setEditAlt(img.alt_text || ""); }}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteMutation.mutate(img)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageRepositoryManager;
