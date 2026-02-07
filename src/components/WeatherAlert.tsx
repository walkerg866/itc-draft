import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

interface WeatherAlertProps {
  message?: string | null;
}

const WeatherAlert = ({ message }: WeatherAlertProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (!message || dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between gap-4 py-3 text-sm font-medium">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{message}</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-sm p-1 opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default WeatherAlert;
