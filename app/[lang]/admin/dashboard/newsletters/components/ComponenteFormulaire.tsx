"use client"
import React, { FormEvent, useState, useEffect } from 'react';
import { AddNewsletter, UpdateNewsletter } from "@app/actions/Newsletters";
import { Rubriques } from '@app/enum/enums';
import { Newsletter } from '@app/interfaces';
import { toast } from '@app/components/FormComponent';
import dynamic from 'next/dynamic'


const EditorText = dynamic(
    () => import('@app/components/titap'),
    { ssr: false }
)

interface IFormData{
  title: string;
  content: string;
  categorie: string;
}

interface FormPropos {
  isArticle: boolean;
  initialData?: Newsletter | null;
  onSuccess?: () => void;
}

export default function ComponenteFormulaire({ isArticle = false, initialData, onSuccess }: FormPropos) {
  const rubriquesOptions = [
  { label: "Sélectionnez une rubrique", value: "" },
  { label: "Une seule santé", value: Rubriques.ONE_HEALTH },
  { label: 'Technologie', value: Rubriques.TECHNOLOGY },
  { label: 'Éco-humanité', value: Rubriques.ECO_HUMANITY },
  { label: 'Portrait et découvertes', value: Rubriques.PORT_DISCOVERY },
];

  const [formData, setFormData] = useState<IFormData>({
    title: "",
    content: "",
    categorie: "",
  });

  useEffect(() => {
    const initiateDatas = async () => {
      if (initialData) {
        const title = initialData.title || "";
        const content = initialData.content || "";
        const categorie = initialData.categorie || "";

        setFormData({ title, content, categorie });
      } else {
        setFormData({ title: "", content: "", categorie: "" });
      }
    }
    initiateDatas()

  }, [initialData]);

  const isEditing = !!initialData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log("Changement de valeur:", e.target.name, e.target.value);
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (formData: IFormData) => {
    if (!formData.title || !formData.content || !formData.categorie) {
      toast(false, false, "Veuillez remplir tous les champs.");
      return;
    }
    try {
      let result;
      const currentId = initialData?.id;

      if (isEditing && currentId) {
        result = await UpdateNewsletter(currentId, formData);
      } else {
        result = await AddNewsletter(formData);
      }

      if (result?.success) {
        setFormData({ title: "", content: "", categorie: "" });
        toast(true, isEditing, isEditing ? "Newsletter mise à jour !" : "Newsletter créée !");
        if (onSuccess) onSuccess();
      }
      else{
        toast(false, false, "Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.");
      }
      console.log("Résultat de la soumission:", result);
    } catch (error) {
      console.error("Erreur:", error);
      toast(false, false, "Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.");
    }
  };

  const container: React.CSSProperties = { backgroundColor: '#50789B', maxWidth: '1200px', width: '100%', padding: '40px', fontFamily: 'Arial, sans-serif', borderRadius: '25px', margin: '0 auto', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { color: 'white', fontWeight: 'bold', marginBottom: '8px', display: 'block', fontSize: '25px', marginTop: '20px' };
  const inputBaseStyle: React.CSSProperties = { backgroundColor: '#2D4459', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', width: '100%', boxSizing: 'border-box', fontSize: '16px', outline: 'none' };
  const textareaStyle: React.CSSProperties = { ...inputBaseStyle, minHeight: '150px', resize: 'vertical' };
  const selectStyle: React.CSSProperties = { ...inputBaseStyle, appearance: 'none' };
  const buttonStyle: React.CSSProperties = { backgroundColor: '#E76C5B', color: 'white', padding: '15px 0', borderRadius: '8px', border: 'none', width: '100%', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px' };

  return (
    <div style={container}>
      <h2 style={{ color: 'white', textAlign: 'center', fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>
        {isEditing ? "Modifier" : (isArticle ? "Ajouter un Article" : "Nouvelle NewsLetter")}
      </h2>
      <article>
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
         <EditorText
            content={formData.content}
            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
          />
        </div>
        <div>
          <label style={labelStyle}>Rubrique</label>
          <select
            name="categorie"
            style={selectStyle}
            value={formData.categorie}
            onChange={(e) => handleChange(e)}
            required
          >
            {rubriquesOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <button style={buttonStyle} onClick={() => handleSubmit(formData)}>
          {isEditing ? "Enregistrer les modifications" : "Publier"}
        </button>
      </article>
    </div>
  );
}