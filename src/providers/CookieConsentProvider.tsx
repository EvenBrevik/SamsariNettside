import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Consent = 'accepted' | 'declined' | null;

type CookieConsentContextValue = {
  consent: Consent;
  accept: () => void;
  decline: () => void;
};

const STORAGE_KEY = 'samsari-cookie-consent';
const GA_ID = 'G-YM85T342YN';

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

let gaLoaded = false;

function initGA() {
  if (gaLoaded) return;
  gaLoaded = true;

  const w = window as Window & { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => { w.dataLayer!.push(args); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as Consent) ?? null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (consent === 'accepted') initGA();
  }, [consent]);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setConsent('declined');
  }, []);

  return (
    <CookieConsentContext.Provider value={{ consent, accept, decline }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  return ctx;
}
