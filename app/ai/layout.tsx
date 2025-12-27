
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div style={{ margin: 0, padding: 0 }}>
        {children}
      </div>
  );
}
