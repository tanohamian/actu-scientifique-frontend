'use client';
import './globals.css'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

   
    
    return (
        <html lang="fr">
            <body>
            <header>

            </header>
            <main>
                 {children}
            </main>
            <footer>
                
            </footer>
            </body>  
        </html>
    );
}