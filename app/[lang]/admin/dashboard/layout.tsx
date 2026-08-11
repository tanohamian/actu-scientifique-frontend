"use client";

import { useState, useEffect } from "react";
import SidebarComponent from "@app/components/sidebar";
import { Menu, ExternalLink } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { IUserInfo } from "../../interfaces";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("AdminLayout");
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    first_name: "",
    last_name: "",
    roles: "",
  });

  const SIDEBAR_WIDTH = 256;
  const MOBILE_BREAKPOINT = 1024;

  useEffect(() => {
    const firstEffect = () => {
      setWindowWidth(window.innerWidth);
    };
    firstEffect();

    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width >= MOBILE_BREAKPOINT && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isMobile = windowWidth < MOBILE_BREAKPOINT;

  const containerStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
  };

  const sidebarDesktopStyle: React.CSSProperties = {
    width: `${SIDEBAR_WIDTH}px`,
    position: "fixed",
    height: "100vh",
    overflowY: "auto",
    zIndex: 30,
    display: isMobile ? "none" : "block",
  };

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 40,
    display: isMobileMenuOpen && isMobile ? "block" : "none",
  };

  const sidebarMobileStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: `${SIDEBAR_WIDTH}px`,
    zIndex: 50,
    transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    display: isMobile ? "block" : "none",
  };

  const backmainStyle: React.CSSProperties = {
    flexGrow: 1,
    width: "100%",
    position: "fixed",
    zIndex: -2,
    backgroundColor: "#5A8FAC",
    minHeight: "100vh",
  };

  const mainStyle: React.CSSProperties = {
    marginLeft: isMobile ? "0" : `${SIDEBAR_WIDTH}px`,
    width: "100%",
  };

  const mobileHeaderStyle: React.CSSProperties = {
    backgroundColor: "#50789B",
    color: "white",
    padding: "1rem",
    position: "sticky",
    top: 0,
    zIndex: 30,
    display: isMobile ? "block" : "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const menuButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    fontFamily: "sans-serif",
  };

  const topActionsContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1.5rem 0 1.5rem",
  };

  const seeSiteButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#50789B",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: "600",
    marginRight: "10rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  };

  const contentStyle: React.CSSProperties = {
    padding: isMobile ? "1rem" : "1.5rem",
    position: "relative",
  };

  useEffect(() => {
    (async () => {
      const storedUserInfo = localStorage.getItem("user");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    })();
  }, []);

  return (
    <div style={containerStyle}>
      <aside style={sidebarDesktopStyle}>
        <SidebarComponent isMobile={false} user={userInfo!} />
      </aside>

      <div style={overlayStyle} onClick={() => setIsMobileMenuOpen(false)} />

      <aside style={sidebarMobileStyle}>
        <SidebarComponent
          onClose={() => setIsMobileMenuOpen(false)}
          isMobile={true}
          user={userInfo!}
        />
      </aside>

      <main style={mainStyle}>
        <div style={backmainStyle}></div>
        <header style={mobileHeaderStyle}>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            style={menuButtonStyle}
            aria-label={t("openMenu")}
          >
            <Menu size={24} />
            <span>{t("menu")}</span>
          </button>
        </header>

        <div style={topActionsContainerStyle}>
          <Link
            href={`/${locale}`}
            target="_blank"
            rel="noopener noreferrer"
            style={seeSiteButtonStyle}
          >
            <span>{t("seeSite")}</span>
            <ExternalLink size={16} />
          </Link>
        </div>

        <div style={contentStyle}>{children}</div>
      </main>
    </div>
  );
}
