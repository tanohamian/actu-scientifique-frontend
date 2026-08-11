"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import styles from "../../styles/Dashboard.module.scss";
import DashboardCardContainer from "@app/components/dashboardCardsContainer";
import { DashboardCardProps } from "@app/components/dashboardCards";
import PublicationCard, { ListItem } from "@app/components/publicationCard";
import { FetchProducts } from "@app/actions/ProductsManager";
import { FetchEvents } from "@app/actions/EventsManager";
import { FetchArticles } from "@app/actions/ArticleManager";
import { FetchFormations } from "@app/actions/FormationsManager";
import { FetchBourses } from "@app/actions/BoursesManager";
import { EventInterface } from "@app/components/eventDataTable";
import LoadingComponent from "@app/components/loadingComponent";
import IndexLineChart from "@app/components/IndexLineChart";
import { FetchStats } from "@app/actions/StatManager";

const today = new Date().toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function Page() {
  const t = useTranslations("AdminDashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<{ date: string; count: number }[]>(
    [],
  );

  const [articles, setArticles] = useState<DashboardCardProps>({
    label: t("cards.articles"),
    value: 0,
    route: "/gestion_article",
  });
  const [visitors, setVisitors] = useState<DashboardCardProps>({
    label: t("cards.dailyVisitors"),
    value: 36,
    route: "/analytics",
  });
  const [products, setProducts] = useState<DashboardCardProps>({
    label: t("cards.products"),
    value: 0,
  });
  const [subscribers] = useState<DashboardCardProps>({
    label: t("cards.subscribers"),
    value: 15,
    route: "/users",
  });

  const [publishedContent, setPublishedContent] = useState<ListItem[]>([]);
  const [realizedEvents, setRealizedEvents] = useState<EventInterface[]>([]);
  const [scholarshipsAndTraining, setScholarshipsAndTraining] = useState<
    ListItem[]
  >([]);

  useEffect(() => {
    async function update() {
      setVisitors({
        label: t("cards.dailyVisitors"),
        route: "/analytics",
        value: (await FetchStats()).count,
      });
      setArticles({
        label: t("cards.articles"),
        route: "/gestion_article",
        value: (await FetchArticles()).length,
      });
      setProducts({
        label: t("cards.products"),
        route: "/produit_commandes",
        value: (await FetchProducts())?.length as number,
      });

      const rowAnalytics = (await FetchStats()).data;
      const grouped = rowAnalytics.reduce(
        (acc: Record<string, number>, current) => {
          const date = new Date(current.createdAt).toLocaleDateString("fr-FR");
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        },
        {},
      );

      const analyticsPerDate = Object.entries(grouped).map(([date, count]) => ({
        date,
        count,
      }));
      setAnalytics(analyticsPerDate);

      setRealizedEvents((await FetchEvents()) as EventInterface[]);
      setPublishedContent((await FetchArticles()).slice(0, 4));

      const formations = await FetchFormations();
      const bourses = await FetchBourses();
      setScholarshipsAndTraining([
        ...formations.slice(0, 2),
        ...bourses.slice(0, 2),
      ]);
      setIsLoading(false);
    }
    update();
  }, [t]);

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

  return (
    <main style={{ padding: "20px" }}>
      <LoadingComponent
        isOpen={isLoading}
        onClose={() => setIsLoading(false)}
      />
      <h1 className={textClasses}>{t("title")}</h1>
      <h3 className={subTextClasses}>{t("subtitle")}</h3>

      <DashboardCardContainer
        subscribers={{ ...subscribers, label: t("cards.subscribers") }}
        articles={{ ...articles, label: t("cards.articles") }}
        visitors={{ ...visitors, label: t("cards.dailyVisitors") }}
        products={{ ...products, label: t("cards.products") }}
      />

      <section className={styles.tendance}>
        <IndexLineChart data={analytics} end={today} />
      </section>

      {/* Grille 2x2 des Publications Cards */}
      <section className={styles["publication-grid"]}>
        <PublicationCard
          cardTitle={t("sections.latestArticles")}
          items={publishedContent}
        />
        <PublicationCard
          cardTitle={t("sections.latestEvents")}
          items={realizedEvents}
        />
        <PublicationCard
          cardTitle={t("sections.scholarshipsAndTraining")}
          items={scholarshipsAndTraining}
        />
      </section>
    </main>
  );
}
