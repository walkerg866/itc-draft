import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, Trash2, Pencil, ImageIcon, Check, X } from "lucide-react";

interface SiteImage {
  id: string;
  key: string;
  file_path: string | null;
  url: string | null;
  alt_text: string | null;
  updated_at: string;
}

const ImagesManager = () => {
  const queryClient = useQueryClient();
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altDraft, setAltDraft] = useState("");

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["admin-site-images"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_images")
        .select("*")
        .order("key");
      if (error) throw error;
      return data as SiteImage[];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ imageId, key, file }: { imageId: string; key: string; file: File }) => {
      const ext = file.name.split(".").pop() ?? "jpg";
      const filePath = `${key}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath);

      // Append cache-bust to force CDN refresh
      const url = `${urlData.publicUrl}?v=${Date.now()}`;

      const { error: dbError } = await supabase
        .from("site_images")
        .update({ file_path: filePath, url })
        .eq("id", imageId);
      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-images"] });
      queryClient.invalidateQueries({ queryKey: ["site-images"] });
      toast.success("Image uploaded successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const altMutation = useMutation({
    mutationFn: async ({ imageId, altText }: { imageId: string; altText: string }) => {
      const { error } = await supabase
        .from("site_images")
        .update({ alt_text: altText })
        .eq("id", imageId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-site-images"] });
      queryClient.invalidateQueries({ queryKey: ["site-images"] });
      setEditingAlt(null);
      toast.success("Alt text updated");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleFileChange = (image: SiteImage, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    uploadMutation.mutate({ imageId: image.id, key: image.key, file });
  };

  if (isLoading) {
    return <div className="text-muted-foreground">Loading images…</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-extrabold text-2xl">Site Images</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage the images used across the website
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-card rounded-lg border border-border overflow-hidden"
          >
            {/* Preview */}
            <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.alt_text ?? image.key}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
              )}
            </div>

            {/* Info */}
            <div className="p-4 space-y-3">
              <div className="font-heading font-bold text-sm text-foreground">
                {image.key}
              </div>

              {/* Alt text */}
              {editingAlt === image.id ? (
                <div className="flex gap-2">
                  <Input
                    value={altDraft}
                    onChange={(e) => setAltDraft(e.target.value)}
                    placeholder="Alt text"
                    className="text-sm h-8"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0"
                    onClick={() => altMutation.mutate({ imageId: image.id, altText: altDraft })}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0"
                    onClick={() => setEditingAlt(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs truncate flex-1">
                    {image.alt_text || "No alt text"}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 shrink-0"
                    onClick={() => {
                      setEditingAlt(image.id);
                      setAltDraft(image.alt_text ?? "");
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </div>
              )}

              {/* Upload / Replace */}
              <Label className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-primary hover:text-orange-deep transition-colors">
                  <Upload className="h-4 w-4" />
                  {image.url ? "Replace Image" : "Upload Image"}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileChange(image, file);
                    e.target.value = "";
                  }}
                />
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesManager;
