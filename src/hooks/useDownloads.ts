import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DownloadItem {
  id: string;
  section: string;
  name: string;
  file_path: string | null;
  file_url: string | null;
  sort_order: number;
}

export const useDownloads = () => {
  return useQuery({
    queryKey: ["public-downloads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("downloads")
        .select("id, section, name, file_path, file_url, sort_order")
        .eq("is_active", true)
        .order("section")
        .order("sort_order");
      if (error) throw error;
      return data as DownloadItem[];
    },
  });
};
