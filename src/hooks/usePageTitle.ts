import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | Samsari` : 'Samsari';
    return () => {
      document.title = 'Samsari';
    };
  }, [title]);
}
