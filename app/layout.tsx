import './globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {



    return (
        <html lang="fr">
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.svg"></link>
                <title>{"L'actualité scientifique"}</title>
                <meta name="google-adsense-account" content="ca-pub-7800085793195104"></meta>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}