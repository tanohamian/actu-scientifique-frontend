'use client'
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    __adsbygooglePushRegistry?: Set<string>;
  }
}

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto' }: { dataAdSlot: string, dataAdFormat?: string }) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !insRef.current) return;

    const registry = window.__adsbygooglePushRegistry || new Set<string>();
    if (registry.has(dataAdSlot)) return;

    const pushAd = () => {
      if (registry.has(dataAdSlot)) return;
      registry.add(dataAdSlot);
      window.__adsbygooglePushRegistry = registry;
      try {
        // @ts-expect-error l'utilisation des ads
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    };

    // Le conteneur peut avoir une largeur nulle au tout premier rendu (avant que
    // la mise en page ne se stabilise) : AdSense plante si on pousse trop tôt.
    if (insRef.current.offsetWidth > 0) {
      pushAd();
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (entries[0]?.contentRect.width > 0) {
        pushAd();
        observer.disconnect();
      }
    });
    observer.observe(insRef.current);

    return () => observer.disconnect();
  }, [dataAdSlot]);

  return (
    <ins ref={insRef} className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-7800085793195104"
         data-ad-slot={dataAdSlot}
         data-ad-format={dataAdFormat}
         data-full-width-responsive="true"></ins>
  );
}