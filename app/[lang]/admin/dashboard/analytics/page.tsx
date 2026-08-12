"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import styles from "../../../styles/Dashboard.module.scss";
import LoadingComponent from "@app/components/loadingComponent";
import IndexLineChart from "@app/components/IndexLineChart";
import { FetchStats } from "@app/actions/StatManager";
import { env } from "@app/config/env";
import AnalyticsCard from "@/app/[lang]/components/analyticsCard";
import { useLocale, useTranslations } from "next-intl";

const textClasses = `
  m-0 
  text-2xl 
  md:text-3xl 
  lg:text-4xl 
  font-light
  text-white
`;

const subTextClasses = `
  text-white 
  text-sm 
  md:text-base 
  font-light
`;

type GroupedStats = Record<string, Record<string, number>>;

export default function Page() {
  const t = useTranslations("Dashboard");
  const locale = useLocale();

  const [isLoading, setIsLoading] = useState(true);

  // Formatage de la date du jour selon la locale actuelle
  const today = useMemo(() => {
    return new Date().toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, [locale]);

  const tendance = useMemo(() => {
    return t("overviewDefault");
  }, [t]);

  const allowedPrefixes = useMemo(() => {
    const dashboardPath = !env.devMode ? "/dashboard" : "/admin/dashboard";
    return [
      {
        endpoint: "/one-health",
        key: "oneHealth",
        title: t("cards.oneHealth"),
      },
      { endpoint: "/technology", key: "tech", title: t("cards.tech") },
      {
        endpoint: "/eco-humanity",
        key: "ecoHumanity",
        title: t("cards.ecoHumanity"),
      },
      {
        endpoint: "/portrait-discovery",
        key: "portraits",
        title: t("cards.portraits"),
      },
      { endpoint: "/agenda", key: "agenda", title: t("cards.agenda") },
      { endpoint: "/about", key: "about", title: t("cards.about") },
      {
        endpoint: "/opportunities/scholarships",
        key: "scholarships",
        title: t("cards.scholarships"),
      },
      {
        endpoint: "/opportunities/training",
        key: "trainings",
        title: t("cards.trainings"),
      },
      {
        endpoint: "/opportunities/science-academy",
        key: "academy",
        title: t("cards.academy"),
      },
      { endpoint: "/shop", key: "shop", title: t("cards.shop") },
      { endpoint: dashboardPath, key: "home", title: t("cards.home") },
    ];
  }, [t]);

  const handleCloseLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <main style={{ padding: "20px" }}>
      <LoadingComponent isOpen={isLoading} onClose={handleCloseLoading} />
      <h1 className={textClasses}>{t("title")}</h1>
      <h3 className={subTextClasses}>{t("subtitle")}</h3>

      <AnalyticsCard
        cardTitle={"Trafic global de l'application"}
        endpoint={'/'}
      />

      <section className={styles.tendance}>
        <p>{tendance}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-[30px] my-10 p-0">
        {allowedPrefixes.map((item) => (
          <AnalyticsCard
            key={item.key}
            cardTitle={item.title}
            endpoint={item.endpoint}
          />
        ))}
      </section>
    </main>
  );
}
