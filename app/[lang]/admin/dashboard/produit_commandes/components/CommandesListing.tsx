"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import AffichageTableau from "./ListingTask";
import { FetchOrders, UpdateOrderStatus } from "@app/actions/Order";
import { Categories } from "@app/admin/page";
import { FormFieldConfig } from "@app/components/addElement";
import { toast } from "@app/components/FormComponent";
import { useTranslations } from "next-intl";

interface Commande {
  id: string;
  name: string;
  category: Categories;
  status: string;
  totalAmount: number;
  quantity: number;
  email: string;
}

interface CommandesTableProps {
  setOrderLength: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommandesTable({
  setOrderLength,
  setLoading,
}: CommandesTableProps) {
  const t = useTranslations("CommandesTable");

  const statusOptions = useMemo(
    () => [
      { value: "CREATED", label: t("status.CREATED") },
      { value: "DELIVERED", label: t("status.DELIVERED") },
      { value: "CANCELED", label: t("status.CANCELED") },
    ],
    [t],
  );

  const getStatusLabel = useCallback(
    (status: string): string => {
      const option = statusOptions.find((opt) => opt.value === status);
      return option ? option.label : status;
    },
    [statusOptions],
  );

  const colonnesCommandes = useMemo(
    () => [
      { key: "name", header: t("columns.name") },
      { key: "category", header: t("columns.category") },
      {
        key: "status",
        header: t("columns.status"),
        render: (value: string) => getStatusLabel(value),
      },
      { key: "totalAmount", header: t("columns.totalAmount") },
      { key: "quantity", header: t("columns.quantity") },
    ],
    [t, getStatusLabel],
  );

  const editFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "status",
        label: t("fields.status"),
        type: "select",
        required: false,
        options: statusOptions,
      },
    ],
    [t, statusOptions],
  );

  const [donneesCommandes, setDonneesCommandes] = useState<Commande[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const commandes = await FetchOrders();
      if (commandes) {
        setDonneesCommandes(commandes);
        setOrderLength(commandes.length);
      }
      setLoading(false);
    })();
  }, [setLoading, setOrderLength]);

  const handleEdit = async (item: Commande) => {
    try {
      const result = await UpdateOrderStatus(item.id, item.status);
      if (result) {
        const updatedCommandes = donneesCommandes.map((commande) => {
          if (commande.id === item.id) {
            return { ...commande, status: item.status };
          }
          return commande;
        });
        setDonneesCommandes(updatedCommandes);
        toast(true, false, t("toasts.updateSuccess"));
      } else {
        toast(false, false, t("toasts.updateError"));
      }
    } catch (error) {
      console.log("erreur lors de la mise à jour de la commande : ", error);
      toast(false, false, t("toasts.updateError"));
    }
  };

  return (
    <AffichageTableau<Commande>
      titre={t("title")}
      columns={colonnesCommandes}
      data={donneesCommandes}
      onEdit={handleEdit}
      editFields={editFields}
    />
  );
}
