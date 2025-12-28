'use client'
import { useEffect, useState } from "react";
import AffichageTableau from "./ListingTask";
import { FetchProducts } from "@/app/actions/Products";
import { Product } from "@/app/admin/page";




const colonnesProduits = [
    { key: 'name', header: 'Produits' },
    { key: 'categories', header: 'Catégories' },
    { key: 'price', header: 'Prix' },
    { key: 'stock', header: 'Stock' },
];

interface ProduitInterface {
    products: Product[],
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ProduitsTable({ products, setProducts }: ProduitInterface) {

    //const [produits, setProduits] = useState<Product[]>([])



    useEffect(() => {
        (async () => {
            const products: Product[] = await FetchProducts()
            if (products) {
                setProducts(products)
            }
        })()
    }, [])

    return (
        <AffichageTableau<Product>
            titre="Produits"
            columns={colonnesProduits}
            data={products}
        />
    );
}