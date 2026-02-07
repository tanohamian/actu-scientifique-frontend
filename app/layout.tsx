'use client';
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
            <header>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.svg"></link>
                <title>{"L'actualité scientifique"}</title>
            </header>
            <body>
            <main>
                 {children}
            </main>
            </body>  
        </html>
    );
}