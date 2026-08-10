"use client";

import { useSyncExternalStore, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { env } from "../config/env";

/**Hook pour détecter si le composant est chargé sur le client sans effet secondaire*/
const subscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true, // Valeur côté client
    () => false, // Valeur côté serveur (SSR)
  );
}

//**Fonction de vérification de la route Admin */
const shouldHideSwitch = (pathname: string): boolean => {
  if (typeof window === "undefined") return false;

  const hostname = window.location.hostname;

  if (env.devMode) {
    const isAdminPath = /^\/[a-z]{2}\/admin(\/.*)?$/i.test(pathname);
    return hostname === "localhost" && isAdminPath;
  } else {
    return hostname.startsWith("admin.");
  }
};

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        content: "'EN'",
        backgroundImage: "none",
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "'FR'",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "0.75rem",
      fontWeight: "bold",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function LanguageSwitcher() {
  const isClient = useIsClient();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const isEnglish = locale === "en";

  if (!isClient) return null;

  if (shouldHideSwitch(pathname)) {
    return null;
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextLocale = event.target.checked ? "en" : "fr";
    const nextPathname =
      pathname === "/"
        ? `/${nextLocale}`
        : pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${nextLocale}`);

    startTransition(() => {
      router.replace(nextPathname);
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={isEnglish}
            onChange={handleLanguageChange}
            disabled={isPending}
          />
        }
        label={locale === "fr" ? "Langue" : "Language"}
        slotProps={{
          typography: {
            sx: {
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "0.9rem",
            },
          },
        }}
      />
    </FormGroup>
  );
}
