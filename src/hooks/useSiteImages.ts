import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SiteImage {
  id: string;
  key: string;
  file_path: string | null;
  url: string | null;
  alt_text: string | null;
}

export type SiteImageMap = Record<string, SiteImage>;

export const useSiteImages = () => {
  return useQuery({
    queryKey: ["site-images"],
    queryFn: async (): Promise<SiteImageMap> => {
      const { data, error } = await supabase
        .from("site_images")
        .select("*");

      if (error) throw error;

      const map: SiteImageMap = {};
      for (const row of data ?? []) {
        map[row.key] = row;
      }
      return map;
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};

/** Helper: get image URL by key with static fallback */
export const getImageUrl = (
  images: SiteImageMap | undefined,
  key: string,
  fallback: string
): string => {
  return images?.[key]?.url ?? fallback;
};

export const getImageAlt = (
  images: SiteImageMap | undefined,
  key: string,
  fallback: string
): string => {
  return images?.[key]?.alt_text ?? fallback;
};
