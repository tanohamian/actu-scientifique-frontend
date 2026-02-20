import './globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children; // On passe juste le relais au layout suivant
}