"use client";
import { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.scss";
import LoadingComponent from "@app/components/loadingComponent";
import IndexLineChart from "@app/components/IndexLineChart";
import { FetchStats } from "@app/actions/StatManager";
import { env } from "@app/config/env";
import AnalyticsCard from "@/app/[lang]/components/analyticsCard";
const today = (new Date()).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

export default function Page() {
  //const today = new Date().toISOString();
  const allowedPrefixes = [
    "/one-health",
    "/technology",
    "/eco-humanity",
    "/portrait-discovery",
    "/agenda",
    "/about",
    "/opportunities/",
    "/shop",
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [tendance] = useState<string>(
    "Vous verrez ici un aperçu de tout ce qui se passe sur l'app",
  );
  //const [analyticsPerEndpoint, setAnalyticsPerEndpoint] = useState<AnalyticsInterface[]>()

  useEffect(() => {
    async function update() {
      const rowData = (await FetchStats()).data;

      console.log({ rowData });
      const dashboardPath = !env.devMode ? "/dashboard" : "/admin/dashboard";
      allowedPrefixes.push(dashboardPath);

      const rowAnalytics = rowData.filter((item) =>
        allowedPrefixes.some((prefix) => item.endpoint.startsWith(prefix)),
      );
      const grouped = rowAnalytics.reduce(
        (acc: Record<string, Record<string, number>>, current) => {
          const endpoint = current.endpoint;
          const date = new Date(current.createdAt).toLocaleDateString("fr-FR");

          if (!acc[endpoint]) {
            acc[endpoint] = {};
          }

          acc[endpoint][date] = (acc[endpoint][date] || 0) + 1;

          return acc;
        },
        {},
      );
      setIsLoading(false);
    }
    update();
  }, []);
  return (
    <main style={{ padding: "20px" }}>
      <LoadingComponent
        isOpen={isLoading}
        onClose={() => setIsLoading(false)}
      />
      <h1 className={textClasses}>Statistiques</h1>
      <h3 className={subTextClasses}>
        {"Avoir une vision du traffic sur l'application "}
      </h3>

      <IndexLineChart end={today} />

      {/* Section aperçu (Tendance) */}
      <section className={styles.tendance}>
        <p>{tendance}</p>
      </section>

      <section
        /*className={styles['publication-grid']}*/ className="grid grid-cols-1 md:grid-cols-2 gap-[30px] my-10 p-0"
      >
        {allowedPrefixes.map((item, key) => {
          return (
            <AnalyticsCard
              key={key}
              cardTitle={item.replace(/^\//, "").replace(/-/g, " ")}
              endpoint={item}
            />
          );
        })}
      </section>
    </main>
  );
}
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