"use client";
import { useEffect, useState } from "react";
import AffichageTableau from "./ListingTask";
import {
  FetchProducts,
  DeleteProduct,
  UpdateProduct,
} from "@app/actions/ProductsManager";
import { FormFieldConfig } from "@app/components/addElement";
import { Product } from "@app/interfaces";
import { toast } from "@app/components/FormComponent";
import ConfirmModal from "@app/components/ConfirmModal";

/*** Source unique de vérité pour les catégories (utilisée par le tableau ET le formulaire) */
const CATEGORIES = [
  { value: "books", label: "livres" },
  { value: "clothes", label: "vêtements" },
  { value: "technology_objects", label: "objets tech" },
] as const;

/*** Mapping value -> label généré automatiquement à partir de CATEGORIES */
const categorieLabels: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.value, c.label]),
);

const colonnesProduits = [
  { key: "name", header: "Produits" },
  {
    key: "categories",
    header: "Catégories",
    render: (value: string) => categorieLabels[value] || value,
  },
  { key: "price", header: "Prix" },
  { key: "stock", header: "Stock" },
];

interface ProduitInterface {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const projectFields: FormFieldConfig[] = [
  {
    name: "name",
    label: "Nom du produit",
    type: "text",
    placeholder: "Entrez votre nom du produit",
    required: false,
  },
  {
    name: "preview_image",
    label: "Image",
    type: "file",
    placeholder: "Entrez votre image",
    required: false,
  },
  {
    name: "description",
    label: "Description",
    type: "description",
    placeholder: "Entrez votre description",
    required: false,
  },
  {
    name: "categories",
    label: "Catégorie",
    type: "select",
    required: false,
    options: [...CATEGORIES],
  },
  {
    name: "price",
    label: "Prix",
    type: "number",
    placeholder: "Entrez votre prix",
    required: false,
  },
  {
    name: "stock",
    label: "Stock",
    type: "number",
    placeholder: "Entrez votre stock",
    required: false,
  },
];

export default function ProduitsTable({
  products,
  setProducts,
  setLoading,
}: ProduitInterface) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDelete = (item: Product) => {
    setProductToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleteModalOpen(false);
    try {
      const deletedProduct = await DeleteProduct(productToDelete.id as string);
      if (deletedProduct) {
        const updatedProducts = products.filter(
          (product) => product.id !== productToDelete.id,
        );
        setProducts(updatedProducts);
        toast(true, false, "Produit supprimé avec succès");
      } else {
        toast(false, false, "Échec de la suppression du produit");
      }
    } catch (error) {
      console.log("erreur lors de la suppression du produit", error);
      toast(false, false, "Échec de la suppression du produit");
    } finally {
      setProductToDelete(null);
    }
  };

  /*** Modifier un produit */
  const handleEdit = async (item: Product) => {
    try {
      const formData = new FormData();
      formData.append("name", item.name);
      formData.append("categories", item.categories);
      formData.append("price", item.price.toString());
      formData.append("stock", item.stock.toString());
      formData.append("description", item?.description || "");

      if (item.preview_image && item.preview_image) {
        formData.append("file", item.preview_image);
      }

      const response = await UpdateProduct(formData, item.id);
      console.log("response : ", response);
      if (response) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === item.id ? response : product,
          ),
        );
        toast(true, false, "Produit modifié avec succès");
      } else {
        toast(false, false, "Échec de la modification du produit");
      }
    } catch (error) {
      console.log("erreur lors de la modification du produit", error);
      toast(false, false, "Échec de la modification du produit");
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const products: Product[] | undefined = await FetchProducts();
      if (products) {
        setProducts(products);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <AffichageTableau<Product>
        titre="Produits"
        columns={colonnesProduits}
        data={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
        editFields={projectFields}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Supprimer ce produit ?"
      />
    </>
  );
}
