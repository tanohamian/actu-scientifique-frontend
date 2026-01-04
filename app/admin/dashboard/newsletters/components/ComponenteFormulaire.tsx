"use client"
import Form from "next/form"
import React, { FormEvent, useState, useEffect } from 'react';
import { FileUpload } from "../../produit_commandes/components/FileUpload";
import { Article, DbMedia, Media } from "./Affichage";
import { AddArticle } from "@/app/actions/Articles";
import { AddMedia, FetchMedias } from "@/app/actions/Medias";
import { AddNewsletter, UpdateNewsletter } from "@/app/actions/Newsletters";
import { INewsletter } from "@/app/actions/Newsletters";
// import { ChevronUp } from 'lucide-react';
export enum ArticleRubriques {
  HEALTH = "une seule santé",
  TECHNOLOGY = "tech",
  ECOHUMANITY = "éco-humanité",
  OPPORTUNITY = "opportunité",
  PORTRAITSDISCOVERIES = "portraits et découvertes"
}

export enum Rubriques {
  TECHNOLOGY = "technology",
  ONE_HEALTH = "health",
  SCIENCE = "science",
  ART = "art"
}

interface FormPropos {
  isArticle: boolean;
  isMedia: boolean;
  initialData?: INewsletter | Article | null;
  onSuccess?: () => void;
}

export default function ComponenteFormulaire({ isArticle = false, isMedia = false, initialData, onSuccess }: FormPropos) {
  const rubriques = Object.values(Rubriques) as string[];

  const endpoint = isArticle ? "articles" : "newsletters"
  const titleText = isArticle ? "Ajouter un Article" : isMedia ? "Ajouter un média" : "Formulaire de News Letters"
  const label = isArticle ? "Titre de l'article" : isMedia ? "Titre du média" : "Titre de la News Letter"
  const [rubrique, setRubrique] = useState()
  // 1. État pour les données du formulaire
  const [formData, setFormData] = useState({
    titre: "",
    contenu: "",
    categorie: "tech",
  });

  useEffect(() => {
    if (initialData) {
      const titre = initialData.titre || "";
      const contenu = initialData.contenu || "";
      const categorie = 'categorie' in initialData
        ? initialData.categorie
        : ('rubrique' in initialData ? initialData.rubrique : "tech");

      setFormData({ titre, contenu, categorie });
    } else {
      setFormData({ titre: "", contenu: "", categorie: "tech" });
    }
  }, [initialData]);

  const isEditing = !!initialData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let result;
      const currentId = initialData?.id;

      if (isEditing && currentId) {
        result = await UpdateNewsletter(currentId, formData);
      } else {
        result = await AddNewsletter(formData);
      }

      if (result?.success) {
        alert(isEditing ? "Mis à jour !" : "Publié !");
        setFormData({ titre: "", contenu: "", categorie: "tech" });
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const container: React.CSSProperties = { backgroundColor: '#50789B', maxWidth: '100%', width: '90%', padding: '30px', fontFamily: 'Arial, sans-serif', borderRadius: '25px', margin: '0 auto', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { color: 'white', fontWeight: 'bold', marginBottom: '8px', display: 'block', fontSize: '25px', marginTop: '20px' };
  const inputBaseStyle: React.CSSProperties = { backgroundColor: '#2D4459', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', width: '100%', boxSizing: 'border-box', fontSize: '16px', outline: 'none' };
  const textareaStyle: React.CSSProperties = { ...inputBaseStyle, minHeight: '150px', resize: 'vertical' };
  const selectStyle: React.CSSProperties = { ...inputBaseStyle, appearance: 'none' };
  const buttonStyle: React.CSSProperties = { backgroundColor: '#E76C5B', color: 'white', padding: '15px 0', borderRadius: '8px', border: 'none', width: '100%', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px' };

  return (
    <div style={container}>
      <h2 style={{ color: 'white', textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>
        {isEditing ? "Modifier" : (isArticle ? "Ajouter un Article" : "Nouvelle NewsLetter")}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>{isArticle ? "Titre de l'article" : "Titre de la NewsLetter"}</label>
          <input
            type="text"
            name="titre"
            style={inputBaseStyle}
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contenu" style={labelStyle}>Contenu</label>
          {isMedia ? null : <textarea
            id="contenu"
            name="contenu"
            style={textareaStyle}
            rows={8}
            value={formData.contenu}
            onChange={handleChange}
            required
          />
          }
        </div>
        <div>
          <label style={labelStyle}>Catégorie</label>
          <select
            name="categorie"
            style={selectStyle}
            value={formData.categorie}
            onChange={handleChange}
          >
            {rubriques.map((rub) => (
              <option key={rub} value={rub}>{rub}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={buttonStyle}>
          {isEditing ? "Enregistrer les modifications" : "Publier"}
        </button>
      </form>
    </div>
  );
}