"use client";

import React from "react";
import SwitchSection from "./components/Section";
import { useTranslations } from "next-intl";

//à ne pas supprimer
const container: React.CSSProperties = {
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const entete: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const title: React.CSSProperties = {
  color: "white",
  fontWeight: "bold",
  marginBottom: "1px",
};

const soustitre: React.CSSProperties = {
  color: "white",
  fontWeight: "bold",
  marginBottom: "30px",
};

export default function Page() {
  const t = useTranslations("ContentManagementPage");

  return (
    <div className="p-5 md:p-10" style={container}>
      <div style={entete}>
        <h1 className="text-2xl md:text-4xl" style={title}>
          {t("title")}
        </h1>
        <h2 className="text-base md:text-xl" style={soustitre}>
          {t("subtitle")}
        </h2>
      </div>
      <SwitchSection />
    </div>
  );
}
