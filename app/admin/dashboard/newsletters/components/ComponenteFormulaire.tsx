"use client"
import React, { FormEvent, useState, useEffect } from 'react';
import { Newsletter } from "./Affichage";
import { AddNewsletter, UpdateNewsletter } from "@/app/actions/Newsletters";
import { Rubriques } from '@/app/enum/enums';



interface FormPropos {
  isArticle: boolean;
  initialData?: Newsletter | null;
  onSuccess?: () => void;
}

export default function ComponenteFormulaire({ isArticle = false, initialData, onSuccess }: FormPropos) {
  const rubriques = Object.values(Rubriques) as string[];

  const [formData, setFormData] = useState({
    title: "",
    contenu: "",
    categorie: "tech",
  });

  useEffect(() => {
    const initiateDatas = async () => {
      if (initialData) {
        const title = initialData.title || "";
        const contenu = initialData.content || "";
        const categorie = initialData.categorie || "tech";

        setFormData({ title, contenu, categorie });
      } else {
        setFormData({ title: "", contenu: "", categorie: "tech" });
      }
    }
    initiateDatas()

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
        setFormData({ title: "", contenu: "", categorie: "tech" });
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
            id="title"
            name="title"
            style={inputBaseStyle}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Contenu</label>
          <textarea
            name="contenu"
            style={textareaStyle}
            rows={8}
            value={formData.contenu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Rubrique</label>
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