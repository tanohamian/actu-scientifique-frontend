
import React from 'react';
import SidebarComponent from "@components/sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  
  const SIDEBAR_WIDTH = '256px'; 

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    
  };

  const mainContentStyle: React.CSSProperties = {
    flexGrow: 1,
    marginLeft: SIDEBAR_WIDTH,
    width: `calc(100% - ${SIDEBAR_WIDTH})`,
    backgroundColor:"#F5F7FA"
  };
  

  return (
    <div style={containerStyle}>
      <SidebarComponent />
      
      <main style={mainContentStyle}>
        {children}
      </main>
    </div>
  );
}