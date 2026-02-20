import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>
}) {

  const { lang } = await params;

  if (!['fr', 'en'].includes(lang)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={lang} translate="no">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.svg" />
        <title>{lang === 'fr' ? "L'actualité scientifique" : "Science news"}</title>
        <meta name="google-adsense-account" content="ca-pub-7800085793195104" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={lang}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}