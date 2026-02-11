import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowUp, ArrowDown, Save, Upload } from "lucide-react";

interface HeroSlide {
  id: string;
  sort_order: number;
  image_url: string;
  headline: string;
  subtitle: string | null;
  cta_text: string | null;
  cta_link: string | null;
  is_active: boolean;
}

const HeroSlidesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editState, setEditState] = useState<Record<string, Partial<HeroSlide>>>({});
  const [uploading, setUploading] = useState<string | null>(null);

  const { data: slides, isLoading } = useQuery({
    queryKey: ["hero-slides-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as HeroSlide[];
    },
  });

  const getField = (slide: HeroSlide, field: keyof HeroSlide) => {
    return editState[slide.id]?.[field] ?? slide[field];
  };

  const setField = (id: string, field: string, value: any) => {
    setEditState((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const saveMutation = useMutation({
    mutationFn: async (slide: HeroSlide) => {
      const updates = editState[slide.id];
      if (!updates || Object.keys(updates).length === 0) return;
      const { error } = await supabase.from("hero_slides").update(updates).eq("id", slide.id);
      if (error) throw error;
    },
    onSuccess: (_, slide) => {
      setEditState((prev) => { const n = { ...prev }; delete n[slide.id]; return n; });
      queryClient.invalidateQueries({ queryKey: ["hero-slides-admin"] });
      toast({ title: "Slide saved" });
    },
    onError: (err: any) => {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async ({ id, newOrder, swapId, swapOrder }: { id: string; newOrder: number; swapId: string; swapOrder: number }) => {
      await supabase.from("hero_slides").update({ sort_order: newOrder }).eq("id", id);
      await supabase.from("hero_slides").update({ sort_order: swapOrder }).eq("id", swapId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["hero-slides-admin"] }),
  });

  const handleImageUpload = async (slideId: string, file: File) => {
    setUploading(slideId);
    const ext = file.name.split(".").pop();
    const path = `hero/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadErr } = await supabase.storage.from("site-images").upload(path, file);
    if (uploadErr) {
      toast({ title: "Upload failed", description: uploadErr.message, variant: "destructive" });
      setUploading(null);
      return;
    }

    const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);
    const { error } = await supabase.from("hero_slides").update({ image_url: urlData.publicUrl }).eq("id", slideId);
    if (error) {
      toast({ title: "Save failed", variant: "destructive" });
    } else {
      queryClient.invalidateQueries({ queryKey: ["hero-slides-admin"] });
      toast({ title: "Image updated" });
    }
    setUploading(null);
  };

  const moveSlide = (index: number, direction: -1 | 1) => {
    if (!slides) return;
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;
    reorderMutation.mutate({
      id: slides[index].id,
      newOrder: slides[target].sort_order,
      swapId: slides[target].id,
      swapOrder: slides[index].sort_order,
    });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Hero Slides</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage the five-panel homepage hero slider.</p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-6">
          {slides?.map((slide, i) => {
            const hasChanges = !!editState[slide.id] && Object.keys(editState[slide.id]).length > 0;
            return (
              <div key={slide.id} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Slide {slide.sort_order}</span>
                  <div className="flex gap-1 ml-auto">
                    <Button size="sm" variant="ghost" disabled={i === 0} onClick={() => moveSlide(i, -1)}>
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" disabled={i === (slides?.length || 0) - 1} onClick={() => moveSlide(i, 1)}>
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
                  {/* Image */}
                  <div>
                    <div className="aspect-video bg-muted rounded overflow-hidden mb-2">
                      {slide.image_url ? (
                        <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No image</div>
                      )}
                    </div>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handleImageUpload(slide.id, f);
                        }}
                      />
                      <Button size="sm" variant="outline" className="w-full" asChild disabled={uploading === slide.id}>
                        <span><Upload className="h-3 w-3 mr-1" />{uploading === slide.id ? "Uploading…" : "Upload Image"}</span>
                      </Button>
                    </label>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Headline</label>
                      <Input
                        value={getField(slide, "headline") as string}
                        onChange={(e) => setField(slide.id, "headline", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Subtitle</label>
                      <Input
                        value={(getField(slide, "subtitle") as string) || ""}
                        onChange={(e) => setField(slide.id, "subtitle", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">CTA Text</label>
                        <Input
                          value={(getField(slide, "cta_text") as string) || ""}
                          onChange={(e) => setField(slide.id, "cta_text", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">CTA Link</label>
                        <Input
                          value={(getField(slide, "cta_link") as string) || ""}
                          onChange={(e) => setField(slide.id, "cta_link", e.target.value)}
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={getField(slide, "is_active") as boolean}
                          onCheckedChange={(v) => setField(slide.id, "is_active", v)}
                        />
                        <span className="text-sm">Active</span>
                      </div>
                      {hasChanges && (
                        <Button size="sm" onClick={() => saveMutation.mutate(slide)}>
                          <Save className="h-3 w-3 mr-1" /> Save Changes
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeroSlidesManager;
