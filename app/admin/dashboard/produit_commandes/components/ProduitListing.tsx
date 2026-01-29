'use client'
import { useEffect, } from "react";
import AffichageTableau from "./ListingTask";
import { FetchProducts, DeleteProduct, UpdateProduct } from "@/app/actions/ProductsManager";
import { FormFieldConfig } from '@/app/components/addElement';
import { Product } from "@/app/interfaces";




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
const projectFields: FormFieldConfig[] = [
    { name: 'name', label: 'Nom du produit', type: 'text', placeholder: 'Entrez votre nom du produit', required: false },
    { name: 'preview_image', label: 'Image', type: 'file', placeholder: 'Entrez votre image', required: false },
    { name: 'description', label: 'Description', type: 'text', placeholder: 'Entrez votre description', required: false },
    {
        name: 'categories', label: 'Catégorie', type: 'select', required: false,
        options: [
            { value: 'books', label: 'livres' },
            { value: 'clothes', label: 'vêtements' },
            { value: 'technology_objects', label: 'objets tech' },
        ]
    },
    { name: 'price', label: 'Prix', type: 'number', placeholder: 'Entrez votre prix', required: false },
    { name: 'stock', label: 'Stock', type: 'number', placeholder: 'Entrez votre stock', required: false },
]


export default function ProduitsTable({ products, setProducts }: ProduitInterface) {

    const handleDelete = async (item: Product) => {
        try {
            const deletedProduct = await DeleteProduct(item.id)
            if (deletedProduct) {
                const updatedProducts = products.filter((product) => product.id !== item.id)
                setProducts(updatedProducts)
            }
        } catch (error) {
            console.log("erreur lors de la suppression du produit", error)
        }
    }

    const handleEdit = async (item: Product) => {
        try {
            console.log("Données reçues pour modification:", item);

            const formData = new FormData();
            formData.append('name', item.name);
            formData.append('categories', item.categories);
            formData.append('price', item.price.toString());
            formData.append('stock', item.stock.toString());
            formData.append('description', item?.description || '');

            if (item.preview_image && item.preview_image.startsWith('data:')) {
                const blob = await fetch(item.preview_image).then(r => r.blob());
                const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                formData.append('file', file);
            }

            const updatedProduct = await UpdateProduct(formData, item.id);

            if (updatedProduct) {
                const updatedProducts = products.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
                setProducts(updatedProducts);
            }
        } catch (error) {
            console.log("erreur lors de la modification du produit", error);
        }
    };




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
            onDelete={handleDelete}
            onEdit={handleEdit}
            editFields={projectFields}
        />
    );
}