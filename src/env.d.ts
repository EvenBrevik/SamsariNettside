/// <reference types="astro/client" />

interface Window {
  /** Injisert av Turnstile-skriptet når kontaktsiden lastes */
  turnstile?: {
    reset: (widget?: string | HTMLElement) => void;
    render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
  };
}
