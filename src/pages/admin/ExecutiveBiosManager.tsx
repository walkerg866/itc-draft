import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Linkedin } from "lucide-react";

interface ExecutiveBio {
  id: string;
  name: string;
  title: string;
  image_url: string | null;
  linkedin_url: string | null;
  is_active: boolean;
  sort_order: number;
}

const ExecutiveBiosManager = () => {
  const queryClient = useQueryClient();
  const [editingBio, setEditingBio] = useState<Partial<ExecutiveBio> | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: bios = [], isLoading } = useQuery({
    queryKey: ["admin-executive-bios"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("executive_bios")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as ExecutiveBio[];
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from("executive_bios")
        .update({ is_active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-executive-bios"] });
      toast({ title: "Visibility updated" });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (bio: Partial<ExecutiveBio>) => {
      if (bio.id) {
        const { error } = await supabase
          .from("executive_bios")
          .update({ name: bio.name, title: bio.title, image_url: bio.image_url, linkedin_url: bio.linkedin_url, sort_order: bio.sort_order })
          .eq("id", bio.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("executive_bios")
          .insert({ name: bio.name!, title: bio.title!, image_url: bio.image_url, linkedin_url: bio.linkedin_url, sort_order: bio.sort_order ?? 0 });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-executive-bios"] });
      setEditingBio(null);
      toast({ title: "Bio saved" });
    },
    onError: (err: Error) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("executive_bios").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-executive-bios"] });
      toast({ title: "Bio deleted" });
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const filePath = `executive-bios/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("site-images").upload(filePath, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(filePath);
    setEditingBio((prev) => prev ? { ...prev, image_url: urlData.publicUrl } : prev);
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Executive Bios</h1>
        <Button onClick={() => setEditingBio({ name: "", title: "", image_url: "", linkedin_url: "", sort_order: bios.length })}>
          <Plus className="h-4 w-4 mr-2" /> Add Bio
        </Button>
      </div>

      {/* Edit form */}
      {editingBio && (
        <Card>
          <CardHeader>
            <CardTitle>{editingBio.id ? "Edit Bio" : "New Bio"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input value={editingBio.name ?? ""} onChange={(e) => setEditingBio({ ...editingBio, name: e.target.value })} />
              </div>
              <div>
                <Label>Title</Label>
                <Input value={editingBio.title ?? ""} onChange={(e) => setEditingBio({ ...editingBio, title: e.target.value })} />
              </div>
              <div>
                <Label>LinkedIn URL</Label>
                <Input value={editingBio.linkedin_url ?? ""} onChange={(e) => setEditingBio({ ...editingBio, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <Label>Sort Order</Label>
                <Input type="number" value={editingBio.sort_order ?? 0} onChange={(e) => setEditingBio({ ...editingBio, sort_order: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
            <div>
              <Label>Photo</Label>
              <div className="flex items-center gap-4 mt-1">
                {editingBio.image_url && (
                  <img src={editingBio.image_url} alt="Preview" className="h-16 w-16 rounded-full object-cover" />
                )}
                <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => saveMutation.mutate(editingBio)} disabled={!editingBio.name || !editingBio.title || saveMutation.isPending}>
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
              <Button variant="outline" onClick={() => setEditingBio(null)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bio list */}
      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : bios.length === 0 ? (
        <p className="text-muted-foreground">No executive bios yet. Click "Add Bio" to create one.</p>
      ) : (
        <div className="grid gap-4">
          {bios.map((bio) => (
            <Card key={bio.id}>
              <CardContent className="flex items-center gap-4 p-4">
                {bio.image_url ? (
                  <img src={bio.image_url} alt={bio.name} className="h-14 w-14 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center shrink-0 text-muted-foreground text-lg font-bold">
                    {bio.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium flex items-center gap-2">
                    {bio.name}
                    {bio.linkedin_url && <Linkedin className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                  <div className="text-sm text-muted-foreground">{bio.title}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs text-muted-foreground">Active</Label>
                    <Switch checked={bio.is_active} onCheckedChange={(checked) => toggleMutation.mutate({ id: bio.id, is_active: checked })} />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setEditingBio(bio)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(bio.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExecutiveBiosManager;
