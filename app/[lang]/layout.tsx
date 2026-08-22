import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CustomizedSwitches from "./components/switchLanguage";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!["fr", "en"].includes(lang)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <div lang={lang} translate="no" suppressHydrationWarning>
      <div>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon.svg"
        />
        <title>
          {lang === "fr" ? "L'actualité scientifique" : "Science news"}
        </title>
        <meta name="google-adsense-account" content="ca-pub-7800085793195104" />
      </div>
      <div>
        <AppRouterCacheProvider options={{ key: "mui" }}>
          <NextIntlClientProvider messages={messages} locale={lang}>
            <section
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 3,
              }}
            >
              <CustomizedSwitches />
            </section>
            {children}
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </div>
    </div>
  );
}
