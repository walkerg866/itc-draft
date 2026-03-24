import { useState, useEffect, useCallback } from 'react';

export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface CookieConsentData {
  preferences: CookieConsentPreferences;
  consentDate: string;
  consentVersion: string;
}

const CONSENT_KEY = 'itc-cookie-consent';
const CONSENT_VERSION = '1.0';

const defaultPreferences: CookieConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

export const useCookieConsent = () => {
  const [consent, setConsentState] = useState<CookieConsentData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CookieConsentData;
        setConsentState(parsed);
      } catch {
        localStorage.removeItem(CONSENT_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  const hasConsented = useCallback(() => {
    return consent !== null;
  }, [consent]);

  const getConsent = useCallback((): CookieConsentPreferences => {
    return consent?.preferences || defaultPreferences;
  }, [consent]);

  const setConsent = useCallback((preferences: CookieConsentPreferences) => {
    const consentData: CookieConsentData = {
      preferences: {
        ...preferences,
        necessary: true,
      },
      consentDate: new Date().toISOString(),
      consentVersion: CONSENT_VERSION,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
    setConsentState(consentData);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  }, [setConsent]);

  const rejectNonEssential = useCallback(() => {
    setConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  }, [setConsent]);

  const revokeConsent = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    setConsentState(null);
  }, []);

  const canTrackAnalytics = useCallback(() => {
    return consent?.preferences.analytics === true;
  }, [consent]);

  return {
    consent,
    isLoaded,
    hasConsented,
    getConsent,
    setConsent,
    acceptAll,
    rejectNonEssential,
    revokeConsent,
    canTrackAnalytics,
  };
};

export const checkAnalyticsConsent = (): boolean => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return false;
    const parsed = JSON.parse(stored) as CookieConsentData;
    return parsed.preferences.analytics === true;
  } catch {
    return false;
  }
};
