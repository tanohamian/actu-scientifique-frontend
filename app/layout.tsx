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
            <body>
            <main>
                 {children}
            </main>
            </body>  
        </html>
    );
}