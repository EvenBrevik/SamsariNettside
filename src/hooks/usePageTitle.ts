import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | Samsari` : 'Effektiviserings partner Samsari';
    return () => {
      document.title = 'Effektiviserings partner Samsari';
    };
  }, [title]);
}
