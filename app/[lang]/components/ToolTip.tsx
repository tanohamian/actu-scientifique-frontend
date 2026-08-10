import React from 'react';
import { useTranslations } from 'next-intl';
import { webHostname } from '@/app/constant';
import { env } from '../config/env';

interface TooltipProps {
  data: {
    label: string;
    messageBubble: string;
    route?: string
  };
  children?: React.ReactNode;
}

export default function Tooltip({ data, children }: TooltipProps) {
  const t = useTranslations("Navigation")
  const target = (!env.devMode ? webHostname: "")+(data.route||"").toLowerCase().replace("dashboard", "")
  return (
    <div className="group relative inline-block mb-5">
        <a href={target}>
            {children ? children : (
                <span className="cursor-pointer underline decoration-dotted text-white-700">
                {t(data.label) ?? data.label}
                </span>
            )}

            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-xs -translate-x-1/2 scale-90 rounded bg-gray-900 px-3 py-2 text-sm text-white opacity-0 transition-all duration-200 ease-out group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
                {data.messageBubble}
                {/* Petite flèche en bas de la bulle */}
                <div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 bg-gray-900 rotate-45" />
            </div>
        </a>
        </div>
  );
}
