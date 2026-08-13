"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import IconComponent from "@components/Icons";
import { env } from "../config/env";
import { DisconnectButton } from "./DisconnectButton";
import { IUserInfo } from "../interfaces";

interface NavItems {
  name: string;
  path: string;
  icon: React.ReactElement;
}

const iconSize = "w-5 h-5";
const ACTIVE_BG_COLOR = "bg-[#E65A46]";

export default function SidebarComponent({
  onClose,
  isMobile,
  user,
}: {
  onClose?: () => void;
  isMobile: boolean;
  user: IUserInfo;
}) {
  const t = useTranslations("AdminSidebar");
  const pathname = usePathname();

  const iconBaseProps = { className: `text-white ${iconSize}` };
  const basePath = !env.devMode ? "/dashboard" : "/admin/dashboard";
  const locale = useLocale();
  const navItems: NavItems[] = [
    {
      name: t("dashboard"),
      path: `/${locale}${basePath}`,
      icon: <IconComponent name="ControlPanel" {...iconBaseProps} />,
    },
    {
      name: t("analytics"),
      path: `/${locale}${basePath}/analytics`,
      icon: <IconComponent name="Analytics" {...iconBaseProps} />,
    },
    {
      name: t("articles"),
      path: `/${locale}${basePath}/gestion_article`,
      icon: <IconComponent name="List" {...iconBaseProps} />,
    },
    {
      name: t("medias"),
      path: `/${locale}${basePath}/medias`,
      icon: <IconComponent name="Video" {...iconBaseProps} />,
    },
    {
      name: t("opportunities"),
      path: `/${locale}${basePath}/formations_bourses`,
      icon: <IconComponent name="Feed" {...iconBaseProps} />,
    },
    {
      name: t("newsletters"),
      path: `/${locale}${basePath}/newsletters`,
      icon: <IconComponent name="Envelope" {...iconBaseProps} />,
    },
    {
      name: t("shop"),
      path: `/${locale}${basePath}/produit_commandes`,
      icon: <IconComponent name="Product" {...iconBaseProps} />,
    },
    {
      name: t("users"),
      path: `/${locale}${basePath}/users`,
      icon: <IconComponent name="UsersOnline" {...iconBaseProps} />,
    },
    {
      name: t("agenda"),
      path: `/${locale}${basePath}/event`,
      icon: <IconComponent name="Schedule" {...iconBaseProps} />,
    },
    {
      name: t("advertising"),
      path: `/${locale}${basePath}/advertising`,
      icon: <IconComponent name="PromoIcon" {...iconBaseProps} />,
    },
  ];

  const NavLinkItem = ({ item }: { item: NavItems }) => {
    console.log("pathname : ", pathname);
    const isActive = pathname === item.path;
    console.log("item.path : ", item.path);

    const baseClasses = `
      flex items-center p-3 my-1 rounded-lg transition-colors duration-150
      text-white focus:outline-none focus:ring-2 focus:ring-white/50
    `;

    const inactiveHoverClasses = `
      hover:bg-white/10 hover:shadow-lg
    `;

    const activeClasses = `${ACTIVE_BG_COLOR} shadow-xl`;

    const linkClasses = `${baseClasses} ${
      isActive ? activeClasses : inactiveHoverClasses
    }`;

    const iconWrapperClasses =
      "mr-3 flex items-center justify-center w-6 h-6 flex-shrink-0";
    const linkTextClasses =
      "whitespace-nowrap overflow-hidden text-ellipsis font-sans text-[1rem] font-light";

    return (
      <Link
        href={item.path}
        className={linkClasses}
        onClick={isMobile ? onClose : undefined}
      >
        <span className={iconWrapperClasses}>
          {item.icon ? (
            item.icon
          ) : (
            <span className="w-5 h-5 bg-white rounded-md" />
          )}
        </span>
        <span className={linkTextClasses}>{item.name}</span>
      </Link>
    );
  };

  const sidebarContainerClasses = `
    w-64 bg-[#50789B] text-white flex flex-col h-screen relative shadow-2xl
  `;

  const headerClasses =
    "p-4 flex items-center justify-between border-b border-white/20";
  const userInfoClasses = "flex items-center";
  const avatarCircleClasses =
    "rounded-full bg-[#3d6080] w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0 text-xl font-bold";
  const avatarTextClasses = "text-sm font-light leading-tight font-sans";
  const closeButtonClasses =
    "bg-transparent border-none text-white cursor-pointer p-2 flex items-center hover:text-red-300 transition-colors duration-200";
  const navClasses = "flex-grow p-2 overflow-y-auto";
  const footerClasses = "p-4 border-t border-white/20";

  // Récupération dynamique du libellé du rôle ou valeur par défaut
  const userRoleLabel = t.has(`roles.${user.roles}`)
    ? t(`roles.${user.roles}`)
    : user.roles;

  return (
    <div className={sidebarContainerClasses}>
      <div className={headerClasses}>
        <div className={userInfoClasses}>
          <div className={avatarCircleClasses}>
            <span>
              {user.first_name[0]?.toUpperCase() || ""}
              {user.last_name[0]?.toUpperCase() || ""}
            </span>
          </div>
          <div className={avatarTextClasses}>
            {userRoleLabel}
            <br />
            {user.first_name} {user.last_name}
          </div>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className={closeButtonClasses}
            aria-label={t("closeMenu")}
          >
            <X size={24} />
          </button>
        )}
      </div>
      <nav className={navClasses}>
        {navItems.map((item) => (
          <NavLinkItem key={item.path} item={item} />
        ))}
      </nav>
      <div className={footerClasses}>
        <DisconnectButton />
      </div>
    </div>
  );
}
