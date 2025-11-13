'use client'

import { useState, useEffect } from "react";
import SidebarComponent from "@/app/components/sidebar";
import { Menu, X } from 'lucide-react';






export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1200);

    const SIDEBAR_WIDTH = 256;
    const MOBILE_BREAKPOINT = 1024;

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);

            if (width >= MOBILE_BREAKPOINT && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const isMobile = windowWidth < MOBILE_BREAKPOINT;

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        minHeight: '100vh',
    };

    const sidebarDesktopStyle: React.CSSProperties = {
        width: `${SIDEBAR_WIDTH}px`,
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        zIndex: 30,
        display: isMobile ? 'none' : 'block',
    };

    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 40,
        display: isMobileMenuOpen && isMobile ? 'block' : 'none',
    };

    const sidebarMobileStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: `${SIDEBAR_WIDTH}px`,
        zIndex: 50,
        transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        display: isMobile ? 'block' : 'none',
    };

    const mainStyle: React.CSSProperties = {
        flexGrow: 1,
        marginLeft: isMobile ? '0' : `${SIDEBAR_WIDTH}px`,
        backgroundColor: '#648db0',
        minHeight: '100vh',
    };

    const mobileHeaderStyle: React.CSSProperties = {
        backgroundColor: '#50789B',
        color: 'white',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        display: isMobile ? 'block' : 'none',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    const menuButtonStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        fontFamily: 'sans-serif',
    };

    const contentStyle: React.CSSProperties = {
        padding: isMobile ? '1rem' : '1.5rem',
    };

    return (
        <div style={containerStyle}>
            {/* Sidebar Desktop */}
            <aside style={sidebarDesktopStyle}>
                <SidebarComponent isMobile={false} />
            </aside>

            {/* Overlay Mobile */}
            <div style={overlayStyle} onClick={() => setIsMobileMenuOpen(false)} />

            {/* Sidebar Mobile */}
            <aside style={sidebarMobileStyle}>
                <SidebarComponent onClose={() => setIsMobileMenuOpen(false)} isMobile={true} />
            </aside>

            {/* Contenu Principal */}
            <main style={mainStyle}>
                {/* Header Mobile */}
                <header style={mobileHeaderStyle}>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        style={menuButtonStyle}
                        aria-label="Ouvrir le menu"
                    >
                        <Menu size={24} />
                        <span>Menu</span>
                    </button>
                </header>

                {/* Contenu */}
                <div style={contentStyle}>{children}</div>
            </main>
        </div>
    );
}
