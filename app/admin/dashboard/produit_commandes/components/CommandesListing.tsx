'use client'

import { useEffect, useState } from "react";
import AffichageTableau from "./ListingTask";
import { FetchOrders, UpdateOrderStatus } from "@/app/actions/Order";
import { Categories } from "@/app/admin/page";
import { FormFieldConfig } from "@/app/components/addElement";

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
// Fonction pour traduire le status
const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
        'CREATED': 'Créé',
        'DELIVERED': 'Livré',
        'CANCELED': 'Annulé'
    };
    return statusMap[status] || status;
};

const colonnesCommandes = [
    { key: 'name', header: 'Produits' },
    { key: 'category', header: 'Catégorie' },
    {
        key: 'status',
        header: 'Status',
        render: (value: string) => getStatusLabel(value)
    },
    { key: 'totalAmount', header: 'Prix' },
    { key: 'quantity', header: 'Quantité' },
];

const editFields: FormFieldConfig[] = [
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        required: false,
        options: [
            { value: 'CREATED', label: 'Créé' },
            { value: 'DELIVERED', label: 'Livré' },
            { value: 'CANCELED', label: 'Annulé' },
        ]
    }
];

export default function CommandesTable({ setOrderLength, setLoading }: CommandesTableProps) {
    const [donneesCommandes, setDonneesCommandes] = useState<Commande[]>([]);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const commandes = await FetchOrders();
            if (commandes) {
                setDonneesCommandes(commandes);
                setOrderLength(commandes.length);
            }
            setLoading(false)
        })();
    }, []);

    const handleEdit = async (item: Commande) => {
        const result = await UpdateOrderStatus(item.id, item.status);
        if (result) {
            const updatedCommandes = donneesCommandes.map((commande) => {
                if (commande.id === item.id) {
                    return { ...commande, status: item.status };
                }
                return commande;
            });
            setDonneesCommandes(updatedCommandes);
        }
    };

    return (
        <AffichageTableau<Commande>
            titre="Commandes"
            columns={colonnesCommandes}
            data={donneesCommandes}
            onEdit={handleEdit}
            editFields={editFields}
        />
    );
}