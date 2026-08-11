"use client";

import React from "react";
import { useTranslations, useFormatter } from "next-intl";

export interface StatGlobalProps {
  numberOrder: number;
  numberValidated: number;
  revenue: number;
}

export default function StatGlobal({
  numberOrder,
  numberValidated,
  revenue,
}: StatGlobalProps) {
  const t = useTranslations("StatGlobal");
  const format = useFormatter();

  const container: React.CSSProperties = {
    margin: 0,
  };

  const statsContainer: React.CSSProperties = {
    display: "grid",
    gap: "20px",
    marginBottom: "30px",
  };

  const statCard: React.CSSProperties = {
    backgroundColor: "#50789B",
    borderRadius: "12px",
    padding: "25px",
    textAlign: "center",
  };

  const statLabel: React.CSSProperties = {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: "14px",
    marginBottom: "10px",
  };

  const statValue: React.CSSProperties = {
    color: "white",
    fontSize: "32px",
    fontWeight: "bold",
  };

  return (
    <div style={container}>
      <div className="grid-cols-1 sm:grid-cols-3" style={statsContainer}>
        <div style={statCard}>
          <div style={statLabel}>{t("orders")}</div>
          <div style={statValue}>{format.number(numberOrder)}</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>{t("validatedPayments")}</div>
          <div style={statValue}>{format.number(numberValidated)}</div>
        </div>
        <div style={statCard}>
          <div style={statLabel}>{t("revenue")}</div>
          <div style={statValue}>
            {t("currency", { amount: format.number(revenue) })}
          </div>
        </div>
      </div>
    </div>
  );
}
