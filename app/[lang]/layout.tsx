import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>
}) {
  
  const messages = await getMessages();
  const lang = (await params).lang
  return (
    <html lang={lang}>
        <head>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.svg"></link>
            <title>{"L'actualité scientifique"}</title>
            <meta name="google-adsense-account" content="ca-pub-7800085793195104"></meta>
        </head>
      <body>
        <NextIntlClientProvider messages={messages} locale={lang}>
            {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}