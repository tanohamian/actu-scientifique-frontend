"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import AffichageTableau from "./ListingTask";

interface Transaction {
  id: string;
  produit: string;
  modeDePaiement: string;
  prix: string;
  acheterPar: string;
}

const donneesTransactions: Transaction[] = [
  {
    id: "N 145226",
    produit: "Science & vie",
    modeDePaiement: "orange money",
    prix: "15.000 fcfa",
    acheterPar: "elie Bamba",
  },
];

export default function TransactionsTable() {
  const t = useTranslations("TransactionsTable");

  const colonnesTransactions = useMemo(
    () => [
      { key: "id", header: t("columns.id") },
      { key: "produit", header: t("columns.produit") },
      { key: "modeDePaiement", header: t("columns.modeDePaiement") },
      { key: "prix", header: t("columns.prix") },
      { key: "acheterPar", header: t("columns.acheterPar") },
    ],
    [t],
  );

  return (
    <AffichageTableau<Transaction>
      titre={t("title")}
      columns={colonnesTransactions}
      data={donneesTransactions}
    />
  );
}
