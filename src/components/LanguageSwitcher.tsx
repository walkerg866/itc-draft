import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay: boolean;
          },
          elementId: string
        ) => void;
      };
    };
  }
}

const LanguageSwitcher = () => {
  useEffect(() => {
    // Prevent duplicate initialization
    if (window.googleTranslateElementInit) return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es,fr,de,nl,zh-CN,ja",
            layout: 0, // SIMPLE layout
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // Relabel default "Select Language" option to simply "Language"
        const relabel = () => {
          const select = document.querySelector<HTMLSelectElement>(
            "#google_translate_element select.goog-te-combo"
          );
          if (select && select.options.length > 0) {
            select.options[0].text = "Language";
            return true;
          }
          return false;
        };
        let attempts = 0;
        const interval = window.setInterval(() => {
          attempts += 1;
          if (relabel() || attempts > 20) window.clearInterval(interval);
        }, 200);
      }
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup not strictly needed since Google Translate persists
    };
  }, []);

  return (
    <div className="google-translate-wrapper">
      <div id="google_translate_element" />
    </div>
  );
};

export default LanguageSwitcher;
