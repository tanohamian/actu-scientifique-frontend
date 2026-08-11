"use client";

import { useEffect, useState, useMemo, useCallback, ChangeEvent } from "react";
import { mockData } from "@/app/constant";
import styles from "../styles/Dashboard.module.scss";
import IndexLineChart from "./IndexLineChart";
import { AnalyticsBoundary } from "../enum/enums";
import { FetchStats } from "../actions/StatManager";
import Tooltip from "./ToolTip";
import { useLocale, useTranslations } from "next-intl";

export interface ListItem {
  text?: string;
  title?: string;
  date?: string | Date;
  createdAt?: Date | string;
}

export interface AnalyticsCardProps {
  cardTitle: string;
  endpoint: string;
}

interface AnalyticsDataPoint {
  date: string;
  count: number;
}

export default function AnalyticsCard({
  cardTitle,
  endpoint,
}: AnalyticsCardProps) {
  const t = useTranslations("AnalyticsCard");
  const locale = useLocale();

  const [data, setData] = useState<AnalyticsDataPoint[]>(mockData);

  // Formatage de la date du jour selon la locale
  const today = useMemo(() => {
    return new Date().toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, [locale]);

  // Options de filtrage traduites et mémoïsées (Correction TypeScript)
  const analyticsBoundaries = useMemo(() => {
    return Object.values(AnalyticsBoundary).map((boundary) => {
      // Mapping explicite selon la valeur numérique
      let translationKey = "sevenDays";
      if (boundary.value === 30) translationKey = "thirtyDays";
      else if (boundary.value === 90) translationKey = "ninetyDays";
      else if (boundary.value === 180) translationKey = "sixMonths"
      else if (boundary.value === 365) translationKey = "year";

      const translatedLabel = t.has(`boundaries.${translationKey}`)
        ? t(`boundaries.${translationKey}`)
        : boundary.label?.replace(/_/g, " ");

      return {
        value: boundary.value,
        label: translatedLabel,
      };
    });
  }, [t]);

  // Traitement et groupement des données par date
  const processAnalyticsData = useCallback(
    (rowAnalytics: Array<{ createdAt: string | Date }>) => {
      const grouped = rowAnalytics.reduce<Record<string, number>>(
        (acc, current) => {
          const date = new Date(current.createdAt).toLocaleDateString(locale);
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {},
      );

      return Object.entries(grouped).map(([date, count]) => ({ date, count }));
    },
    [locale],
  );

  // Fonction d'acquisition de données réutilisable
  const fetchAndSetStats = useCallback(
    async (daysRange: number, isSubscribed = true) => {
      try {
        const response = await FetchStats({ endpoint, daysRange });
        const rowAnalytics = response?.data || [];
        const dataToSet = processAnalyticsData(rowAnalytics);

        if (isSubscribed) {
          setData(dataToSet);
        }
      } catch (error) {
        console.error(t("errors.fetchError"), error);
      }
    },
    [endpoint, processAnalyticsData, t],
  );

  // Effet de chargement initial (Correction React Linter)
  useEffect(() => {
    let isSubscribed = true;

    const initFetch = async () => {
      await fetchAndSetStats(7, isSubscribed);
    };

    initFetch();

    return () => {
      isSubscribed = false;
    };
  }, [fetchAndSetStats]);

  const onFilterChange = useCallback(
    async (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = parseInt(e.target.value, 10);
      if (!isNaN(selectedValue)) {
        await fetchAndSetStats(selectedValue);
      }
    },
    [fetchAndSetStats],
  );

  const tooltipData = useMemo(() => {
    return {
      label: cardTitle,
      messageBubble: t("tooltip.message", { endpoint }),
      route: endpoint,
    };
  }, [cardTitle, endpoint, t]);

  return (
    <article className={styles.card}>
      <Tooltip data={tooltipData} />
      <ul className={styles["content-list"]}>
        <select className={styles["date-filter"]} onChange={onFilterChange}>
          {analyticsBoundaries.map((boundary, index) => (
            <option key={boundary.value ?? index} value={boundary.value}>
              {boundary.label}
            </option>
          ))}
        </select>
        <IndexLineChart data={data} end={today} />
      </ul>
    </article>
  );
}
