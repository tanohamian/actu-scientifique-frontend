import { AuthProvider } from "../context/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <AuthProvider>
        <section>
          {children}
        </section>
      </AuthProvider>
  );
}
