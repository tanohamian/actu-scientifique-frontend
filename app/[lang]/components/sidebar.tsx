"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import IconComponent from "@components/Icons";
import { env } from "../config/env";
import { DisconnectButton } from "./DisconnectButton";
import { IUserInfo } from "../interfaces";

interface NavItems {
  name: string;
  path: string;
  icon: React.ReactElement;
}
export const ROLE_LABELS: Record<string, string> = {
  ROLE_ADMIN: "Administrateur",
  ROLE_EDITOR: "Éditeur",
  ROLE_VIEWER: "Lecteur",
} as const;

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
  const pathname = usePathname();
  console.log("user : ", user);

  const iconBaseProps = { className: `text-white ${iconSize}` };
  const basePath = !env.devMode ? "/dashboard" : "/admin/dashboard";
  const navItems: NavItems[] = [
    {
      name: "Tableau de bord",
      path: `${basePath}`,
      icon: <IconComponent name="ControlPanel" {...iconBaseProps} />,
    },
    {
      name: "Statistiques",
      path: `${basePath}/analytics`,
      icon: <IconComponent name="Analytics" {...iconBaseProps} />,
    },
    {
      name: "Gestion des articles",
      path: `${basePath}/gestion_article`,
      icon: <IconComponent name="List" {...iconBaseProps} />,
    },
    {
      name: "Medias (Vidéos,Podcasts)",
      path: `${basePath}/medias`,
      icon: <IconComponent name="Video" {...iconBaseProps} />,
    },
    {
      name: "Opportunités",
      path: `${basePath}/formations_bourses`,
      icon: <IconComponent name="Feed" {...iconBaseProps} />,
    },
    {
      name: "Newsletters",
      path: `${basePath}/newsletters`,
      icon: <IconComponent name="Envelope" {...iconBaseProps} />,
    },
    {
      name: "Boutiques",
      path: `${basePath}/produit_commandes`,
      icon: <IconComponent name="Product" {...iconBaseProps} />,
    },
    {
      name: "Utilisateurs",
      path: `${basePath}/users`,
      icon: <IconComponent name="UsersOnline" {...iconBaseProps} />,
    },
    {
      name: "Agenda",
      path: `${basePath}/event`,
      icon: <IconComponent name="Schedule" {...iconBaseProps} />,
    },
    {
      name: "Publicité",
      path: `${basePath}/advertising`,
      icon: <IconComponent name="PromoIcon" {...iconBaseProps} />,
    },
  ];

  const NavLinkItem = ({ item }: { item: NavItems }) => {
    const isActive = pathname === item.path;

    const baseClasses = `
            flex items-center p-3 my-1 rounded-lg transition-colors duration-150
            text-white focus:outline-none focus:ring-2 focus:ring-white/50
        `;

    const inactiveHoverClasses = `
            hover:bg-white/10 hover:shadow-lg
        `;

    const activeClasses = `${ACTIVE_BG_COLOR} shadow-xl`;

    const linkClasses = `${baseClasses} ${isActive ? activeClasses : inactiveHoverClasses}`;

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
        w-64 // sidebarWidth: 256px
        bg-[#50789B] 
        text-white 
        flex 
        flex-col 
        h-screen // height: 100vh
        relative 
        shadow-2xl
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

  return (
    <div className={sidebarContainerClasses}>
      <div className={headerClasses}>
        <div className={userInfoClasses}>
          <div className={avatarCircleClasses}>
            <span>
              {user.first_name[0].toUpperCase() || ""}
              {user.last_name[0].toUpperCase() || ""}
            </span>
          </div>
          <div className={avatarTextClasses}>
            {ROLE_LABELS[user.roles].toUpperCase()}
            <br />
            {user.first_name} {user.last_name}
          </div>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className={closeButtonClasses}
            aria-label="Fermer le menu"
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
