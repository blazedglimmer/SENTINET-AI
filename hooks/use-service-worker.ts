'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

// Extend the Window interface to include workbox
declare global {
  interface Window {
    workbox?: Workbox;
  }
}

export function useServiceWorker() {
  const [isReady, setIsReady] = useState(false);
  const [needsRefresh, setNeedsRefresh] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = new Workbox('/service-worker.js');

      wb.addEventListener('installed', event => {
        if (event.isUpdate) {
          setNeedsRefresh(true);
        }
      });

      wb.addEventListener('activated', () => {
        setIsReady(true);
      });

      wb.register();

      //   window.workbox = wb; // can do this if in case of global access
    }
  }, []);

  const refreshApp = () => {
    window.location.reload();
  };

  return {
    isReady,
    needsRefresh,
    refreshApp,
  };
}
