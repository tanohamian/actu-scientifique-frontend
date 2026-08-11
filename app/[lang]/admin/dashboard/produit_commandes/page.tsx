"use client";
import React, { useState, useEffect, useCallback } from "react";
import ComponentFormProd from "./components/FormProd";
import StatGlobal from "./components/StatGlobal";
import ProduitsTable from "./components/ProduitListing";
import TransactionsTable from "./components/TransactionsListing";
import CommandesTable from "./components/CommandesListing";
import { Product } from "@app/interfaces";
import LoadingComponent from "@app/components/loadingComponent";
import { useTranslations } from "next-intl";

const MOBILE_BREAKPOINT = 1024;

const styles = {
  container: (isMobile: boolean): React.CSSProperties => ({
    minHeight: "100vh",
    padding: isMobile ? "20px" : "40px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    gap: "30px",
    flexDirection: isMobile ? "column" : "row",
  }),
  leftSection: (isMobile: boolean): React.CSSProperties => ({
    flex: isMobile ? "none" : "1",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    width: isMobile ? "100%" : "auto",
  }),
  rightSection: (isMobile: boolean): React.CSSProperties => ({
    width: isMobile ? "100%" : "550px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "30px",
    height: "fit-content",
  }),
  title: (isMobile: boolean): React.CSSProperties => ({
    color: "white",
    fontSize: isMobile ? "28px" : "36px",
    fontWeight: "bold",
    marginBottom: "1px",
  }),
  soustitre: (isMobile: boolean): React.CSSProperties => ({
    color: "white",
    fontSize: isMobile ? "16px" : "20px",
    fontWeight: "bold",
    marginBottom: "30px",
  }),
};

export default function Page() {
  const t = useTranslations("DashboardPage");

  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT,
  );
  const [orderLength, setOrderLength] = useState(0);
  const [validatedLength, setValidatedLength] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCloseLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div style={styles.container(isMobile)}>
      <LoadingComponent isOpen={isLoading} onClose={handleCloseLoading} />
      <div style={styles.leftSection(isMobile)}>
        <h1 style={styles.title(isMobile)}>{t("title")}</h1>
        <h2 style={styles.soustitre(isMobile)}>{t("subtitle")}</h2>

        <StatGlobal
          numberOrder={orderLength}
          numberValidated={validatedLength}
          revenue={revenue}
        />

        <h2 style={styles.soustitre(isMobile)}>{t("sections.products")}</h2>
        <ProduitsTable
          products={products}
          setProducts={setProducts}
          setLoading={setIsLoading}
        />

        <h2 style={styles.soustitre(isMobile)}>{t("sections.orders")}</h2>
        <CommandesTable
          setOrderLength={setOrderLength}
          setLoading={setIsLoading}
        />

        <h2 style={styles.soustitre(isMobile)}>{t("sections.transactions")}</h2>
        <TransactionsTable />
      </div>

      <div style={styles.rightSection(isMobile)}>
        <ComponentFormProd setProducts={setProducts} />
      </div>
    </div>
  );
}
