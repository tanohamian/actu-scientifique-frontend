'use client'
import { useEffect } from 'react';

export default function AdBanner({ dataAdSlot, dataAdFormat = 'auto' }: { dataAdSlot: string, dataAdFormat?: string }) {
  useEffect(() => {
    try {
      // @ts-expect-error l'utilisation des ads
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-7800085793195104"
         data-ad-slot={dataAdSlot}
         data-ad-format={dataAdFormat}
         data-full-width-responsive="true"></ins>
  );
}