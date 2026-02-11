import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Trash2, Video } from "lucide-react";

const BUCKET = "site-images";
const VIDEO_KEY = "homepage-video";

const VideosManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: video, isLoading } = useQuery({
    queryKey: ["site-videos", VIDEO_KEY],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_videos" as any)
        .select("*")
        .eq("key", VIDEO_KEY)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (video?.file_path) {
        await supabase.storage.from(BUCKET).remove([video.file_path]);
      }
      const { error } = await supabase
        .from("site_videos" as any)
        .delete()
        .eq("key", VIDEO_KEY);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-videos"] });
      toast({ title: "Video deleted" });
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      // Remove old file if exists
      if (video?.file_path) {
        await supabase.storage.from(BUCKET).remove([video.file_path]);
      }

      const filePath = `videos/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(filePath);

      if (video) {
        const { error } = await supabase
          .from("site_videos" as any)
          .update({ file_path: filePath, url: urlData.publicUrl, name: file.name } as any)
          .eq("key", VIDEO_KEY);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("site_videos" as any)
          .insert({ key: VIDEO_KEY, name: file.name, file_path: filePath, url: urlData.publicUrl } as any);
        if (error) throw error;
      }

      queryClient.invalidateQueries({ queryKey: ["site-videos"] });
      toast({ title: "Video uploaded successfully" });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-heading font-bold mb-1">Homepage Video</h1>
      <p className="text-muted-foreground mb-8">
        Upload an MP4 video to display on the homepage.
      </p>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : video?.url ? (
        <div className="space-y-4">
          <video
            src={video.url}
            controls
            className="w-full rounded-lg shadow-md aspect-video bg-black"
          />
          <div className="flex items-center gap-3">
            <Label
              htmlFor="replace-video"
              className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Uploading…" : "Replace Video"}
            </Label>
            <input
              id="replace-video"
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
          <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No video uploaded yet.</p>
          <Label
            htmlFor="upload-video"
            className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload Video"}
          </Label>
          <input
            id="upload-video"
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
};

export default VideosManager;
