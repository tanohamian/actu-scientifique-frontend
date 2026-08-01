'use client'
import { useEffect } from 'react';

declare global {
  interface Window {
    __adsbygooglePushRegistry?: Set<string>;
  }
}

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto' }: { dataAdSlot: string, dataAdFormat?: string }) {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const registry = window.__adsbygooglePushRegistry || new Set<string>();
      if (registry.has(dataAdSlot)) return;

      registry.add(dataAdSlot);
      window.__adsbygooglePushRegistry = registry;

      // @ts-expect-error l'utilisation des ads
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [dataAdSlot]);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-7800085793195104"
         data-ad-slot={dataAdSlot}
         data-ad-format={dataAdFormat}
         data-full-width-responsive="true"></ins>
  );
}