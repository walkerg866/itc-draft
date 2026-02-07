import { FileText, Download } from "lucide-react";
import type { DownloadItem } from "@/hooks/useDownloads";

interface DownloadListCardProps {
  items: DownloadItem[];
  isDark: boolean;
}

const DownloadListCard = ({ items, isDark }: DownloadListCardProps) => {
  const handleDownload = (item: DownloadItem) => {
    if (item.file_url) {
      window.open(item.file_url, "_blank");
    } else {
      alert(
        `"${item.name}" is not yet available for download. Please check back later or contact us.`
      );
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border ${
        isDark
          ? "bg-steel-light/40 border-steel-light/30"
          : "bg-card border-border"
      }`}
    >
      {items.map((item, i) => (
        <button
          key={item.id}
          className={`w-full flex items-center justify-between gap-4 px-6 py-4 text-left group transition-colors ${
            i < items.length - 1
              ? isDark
                ? "border-b border-steel-light/20"
                : "border-b border-border"
              : ""
          } ${isDark ? "hover:bg-steel-light/60" : "hover:bg-muted"}`}
          onClick={() => handleDownload(item)}
        >
          <div className="flex items-center gap-3 min-w-0">
            <FileText
              className={`h-5 w-5 shrink-0 ${
                isDark ? "text-primary/70" : "text-primary"
              }`}
            />
            <span
              className={`font-medium text-sm truncate ${
                isDark
                  ? "text-secondary-foreground/90"
                  : "text-foreground"
              }`}
            >
              {item.name}
            </span>
            {!item.file_url && (
              <span className="text-xs text-muted-foreground italic shrink-0">
                Coming soon
              </span>
            )}
          </div>
          <Download
            className={`h-4 w-4 shrink-0 transition-colors ${
              isDark
                ? "text-steel-muted group-hover:text-primary"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default DownloadListCard;
