import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Cookie, Settings } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export const CookieConsent = () => {
  const {
    isLoaded,
    hasConsented,
    acceptAll,
    rejectNonEssential,
    setConsent,
  } = useCookieConsent();

  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  if (!isLoaded || hasConsented()) {
    return null;
  }

  const handleSavePreferences = () => {
    setConsent(preferences);
    setShowPreferences(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-4xl mx-auto bg-foreground/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-muted/10">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-lg shrink-0">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-primary-foreground font-semibold text-lg">We value your privacy</h3>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                    By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or
                    reject non-essential cookies.{' '}
                    <Link to="/legal#privacy" className="text-primary hover:underline">
                      Learn more in our Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setShowPreferences(true)}
                  className="order-3 sm:order-1 text-muted hover:text-primary-foreground hover:bg-muted/10"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Preferences
                </Button>
                <Button
                  variant="outline"
                  onClick={rejectNonEssential}
                  className="order-2 border-muted/20 bg-background text-foreground hover:bg-background/90"
                >
                  Reject Non-Essential
                </Button>
                <Button
                  variant="default"
                  onClick={acceptAll}
                  className="order-1 sm:order-3"
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-lg bg-background">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Manage your cookie preferences below. Necessary cookies are always enabled as they are essential for the website to function.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-base font-medium">Necessary Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Essential for the website to function. Cannot be disabled.
                </p>
              </div>
              <Switch checked disabled className="mt-1" />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-base font-medium">Analytics Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Help us understand how visitors interact with our website by collecting anonymous information.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
                className="mt-1"
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-base font-medium">Marketing Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Used to track visitors across websites to display relevant advertisements.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
                className="mt-1"
              />
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Label className="text-base font-medium">Preference Cookies</Label>
                <p className="text-sm text-muted-foreground">
                  Remember your settings and preferences for a better experience.
                </p>
              </div>
              <Switch
                checked={preferences.preferences}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, preferences: checked }))
                }
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreferences(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const CookieSettingsButton = ({ className }: { className?: string }) => {
  const { revokeConsent } = useCookieConsent();

  return (
    <button onClick={() => revokeConsent()} className={className}>
      Cookie Settings
    </button>
  );
};
