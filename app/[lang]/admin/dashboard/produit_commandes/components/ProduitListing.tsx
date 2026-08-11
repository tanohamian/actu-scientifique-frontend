"use client";

import { useEffect, useState, useMemo } from "react";
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
import { useTranslations } from "next-intl";

interface ProduitInterface {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProduitsTable({
  products,
  setProducts,
  setLoading,
}: ProduitInterface) {
  const t = useTranslations("ProduitsTable");

  const categoriesOptions = useMemo(
    () => [
      { value: "books", label: t("categories.books") },
      { value: "clothes", label: t("categories.clothes") },
      {
        value: "technology_objects",
        label: t("categories.technology_objects"),
      },
    ],
    [t],
  );

  const categorieLabels: Record<string, string> = useMemo(
    () => Object.fromEntries(categoriesOptions.map((c) => [c.value, c.label])),
    [categoriesOptions],
  );

  const colonnesProduits = useMemo(
    () => [
      { key: "name", header: t("columns.name") },
      {
        key: "categories",
        header: t("columns.categories"),
        render: (value: string) => categorieLabels[value] || value,
      },
      { key: "price", header: t("columns.price") },
      { key: "stock", header: t("columns.stock") },
    ],
    [t, categorieLabels],
  );

  const projectFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "name",
        label: t("fields.name.label"),
        type: "text",
        placeholder: t("fields.name.placeholder"),
        required: false,
      },
      {
        name: "preview_image",
        label: t("fields.preview_image.label"),
        type: "file",
        placeholder: t("fields.preview_image.placeholder"),
        required: false,
      },
      {
        name: "description",
        label: t("fields.description.label"),
        type: "description",
        placeholder: t("fields.description.placeholder"),
        required: false,
      },
      {
        name: "categories",
        label: t("fields.categories.label"),
        type: "select",
        required: false,
        options: categoriesOptions,
      },
      {
        name: "price",
        label: t("fields.price.label"),
        type: "number",
        placeholder: t("fields.price.placeholder"),
        required: false,
      },
      {
        name: "stock",
        label: t("fields.stock.label"),
        type: "number",
        placeholder: t("fields.stock.placeholder"),
        required: false,
      },
    ],
    [t, categoriesOptions],
  );

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
        toast(true, false, t("toasts.deleteSuccess"));
      } else {
        toast(false, false, t("toasts.deleteError"));
      }
    } catch (error) {
      console.log("erreur lors de la suppression du produit", error);
      toast(false, false, t("toasts.deleteError"));
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

      if (item.preview_image) {
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
        toast(true, false, t("toasts.editSuccess"));
      } else {
        toast(false, false, t("toasts.editError"));
      }
    } catch (error) {
      console.log("erreur lors de la modification du produit", error);
      toast(false, false, t("toasts.editError"));
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchedProducts: Product[] | undefined = await FetchProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts);
      }
      setLoading(false);
    })();
  }, [setLoading, setProducts]);

  return (
    <>
      <AffichageTableau<Product>
        titre={t("title")}
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
        title={t("modals.deleteTitle")}
      />
    </>
  );
}
