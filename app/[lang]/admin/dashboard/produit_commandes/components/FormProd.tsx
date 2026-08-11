/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useMemo, useCallback } from "react";
import { Upload } from "lucide-react";
import { Product } from "@app/interfaces";
import { toast } from "@app/components/FormComponent";
import dynamic from "next/dynamic";
import { AddProduct } from "@/app/[lang]/actions/ProductsManager";
import { useTranslations } from "next-intl";

const EditorText = dynamic(() => import("@app/components/titap"), {
  ssr: false,
});

interface ComponentFormProdProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export interface Categories {
  id: string;
  label: string;
}

const styles = {
  formTitle: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "25px",
  } as React.CSSProperties,
  publishButton: {
    backgroundColor: "#E65A46",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "14px 30px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    transition: "background-color 0.3s",
  } as React.CSSProperties,
  select: {
    backgroundColor: "rgba(0, 40, 60, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    padding: "12px 15px",
    paddingRight: "40px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    cursor: "pointer",
    zIndex: 1,
    height: "45px",
  } as React.CSSProperties,
  selectWrapper: {
    position: "relative",
  } as React.CSSProperties,
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
  } as React.CSSProperties,
  label: {
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
  } as React.CSSProperties,
  input: {
    backgroundColor: "rgba(0, 40, 60, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    padding: "12px 15px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    width: "80%",
  } as React.CSSProperties,
  imageUploadArea: {
    backgroundColor: "rgba(0, 40, 60, 0.6)",
    border: "2px dashed rgba(255, 255, 255, 0.3)",
    borderRadius: "8px",
    padding: "40px 20px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  } as React.CSSProperties,
  uploadIcon: {
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: "10px",
  } as React.CSSProperties,
  uploadText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "14px",
  } as React.CSSProperties,
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  } as React.CSSProperties,
};

export default function ComponentFormProd({
  setProducts,
}: ComponentFormProdProps) {
  const t = useTranslations("ComponentFormProd");

  const categories: Categories[] = useMemo(
    () => [
      { id: "books", label: t("categories.books") },
      { id: "clothes", label: t("categories.clothes") },
      { id: "technology_objects", label: t("categories.technology_objects") },
    ],
    [t],
  );

  const [nomProduit, setNomProduit] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState(categories[0].id);
  const [prix, setPrix] = useState(0);
  const [stock, setStock] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = useCallback(async () => {
    try {
      const product = new FormData();
      product.append("name", nomProduit);
      product.append("description", description);
      product.append("categories", categorie);
      product.append("price", prix.toString());
      product.append("stock", stock.toString());
      if (imageFile) {
        product.append("file", imageFile);
      }
      const response = await AddProduct(product);

      if (response) {
        setProducts((prevProducts) => [...prevProducts, response]);
        setNomProduit("");
        setDescription("");
        setCategorie(categories[0].id);
        setPrix(0);
        setStock(0);
        setImageFile(null);
        setImagePreview(null);
        toast(true, false, t("toasts.success"));
      } else {
        toast(false, false, t("toasts.error"));
      }
    } catch (error) {
      console.error("erreur lors de l'ajout du produit : ", error);
      toast(false, false, t("toasts.error"));
    }
  }, [
    nomProduit,
    description,
    categorie,
    prix,
    stock,
    imageFile,
    setProducts,
    categories,
    t,
  ]);

  return (
    <div>
      <h2 style={styles.formTitle}>{t("title")}</h2>

      <div style={styles.formGroup}>
        <label style={styles.label}>{t("labels.productName")}</label>
        <input
          type="text"
          placeholder={t("placeholders.productName")}
          value={nomProduit}
          onChange={(e) => setNomProduit(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>{t("labels.image")}</label>
        <label style={styles.imageUploadArea}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "150px" }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Upload size={40} style={styles.uploadIcon} />
              <div style={styles.uploadText}>
                {t("placeholders.uploadImage")}
              </div>
            </div>
          )}
        </label>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>{t("labels.description")}</label>
        <EditorText
          content={description}
          onChange={(html) => setDescription(html)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>{t("labels.category")}</label>
        <div style={styles.selectWrapper}>
          <select
            value={categorie}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCategorie(e.target.value)
            }
            style={styles.select}
          >
            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
                style={{ backgroundColor: "#2c4f63" }}
              >
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>{t("labels.price")}</label>
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(Number(e.target.value))}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>{t("labels.stock")}</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            style={styles.input}
          />
        </div>
      </div>

      <button
        style={styles.publishButton}
        onClick={handlePublish}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d54a36")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#E65A46")}
      >
        {t("publishButton")}
      </button>
    </div>
  );
}
