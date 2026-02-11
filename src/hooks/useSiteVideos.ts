import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSiteVideos = () => {
  return useQuery({
    queryKey: ["site-videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_videos" as any)
        .select("*");
      if (error) throw error;
      return data as any[];
    },
  });
};

export const getVideoUrl = (
  videos: any[] | undefined,
  key: string
): string | null => {
  if (!videos) return null;
  const video = videos.find((v: any) => v.key === key);
  return video?.url || null;
};
