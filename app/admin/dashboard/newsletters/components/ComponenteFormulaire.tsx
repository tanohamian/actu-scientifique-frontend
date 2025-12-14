"use client"
import Form from "next/form"
import React, { FormEvent, useState } from 'react';
import { FileUpload } from "../../produit_commandes/components/FileUpload";
import AddArticle from "@/app/actions/addArticle";
import { Article, Media } from "./Affichage";
import AddMedia from "@/app/actions/addMedia";
// import { ChevronUp } from 'lucide-react';
export enum Rubriques{
    HEALTH = "une seule santé",
    TECHNOLOGY = "tech",
    ECOHUMANITY ="éco-humanité",
    OPPORTUNITY="opportunité",
    CALENDAR="agenda",
    PORTRAITSDISCOVERIES="portraits et découvertes"
}
interface FormPropos{
  isArticle: boolean
  isMedia ?: boolean
}
export default function ComponenteFormulaire( {isArticle=false, isMedia=false}: FormPropos) {
  const rubriques = Object.values(Rubriques) as string[]; // Forcer le type à string[] pour le mapping
  const endpoint = isArticle? "articles" : "newsletters"
  const titleText = isArticle? "Ajouter un Article" : "Formulaire de News Letters"
  const label = isArticle? "Titre de l'article" : "Titre de la News Letter"
  
  // 1. État pour les données du formulaire
  const [formData, setFormData] = useState({
        title: "futur du journalisme",
        type : "",
        file: undefined,
        contenu: "le contenu................",
        categorie:  isArticle ? rubriques[0] : "Technologie", // Défaut basé sur l'état
    });

  // 2. Gestionnaire pour mettre à jour l'état
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    
  const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); 

        try {
          if (isArticle) {
            const newArticle: Article = {
              title: formData.title,
              content: formData.contenu,
              rubrique: formData.categorie,
            };
            
            console.log("Objet Article à Soumettre:", newArticle);
            
            AddArticle(newArticle)
            alert(`Article soumis ! Titre : ${newArticle.title} / Rubrique : ${newArticle.rubrique}`);

          } else if (isMedia) {
            const newMedia : Media = {
              title : formData.title,
              name: formData.type,
              category: formData.categorie,
              file: formData.file,
              type: formData.type
            }
            console.log("Objet Article à Soumettre:", newMedia);
            AddMedia(newMedia)
            console.log("media soumis")
          }
          else {
            console.log("Données Newsletter à Soumettre:", formData);
            alert(`Newsletter soumise ! Titre : ${formData.title}`);
          }
        } catch (error) {
          console.log((error as {message: string}).message)
        }
        
        
    };
  // Rendre le conteneur responsive
  const container: React.CSSProperties = {
    backgroundColor: '#50789B',
    maxWidth: '500px', // Largeur maximale pour les grands écrans
    width: '90%', // Occupe 90% de la largeur disponible
    minHeight: 'auto', // Hauteur s'adapte au contenu
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '25px',
    margin: '20px auto', // Centre le bloc
    boxSizing: 'border-box', // Assure que padding est inclus dans la largeur/hauteur
  };

  const labelStyle: React.CSSProperties = {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'block',
    fontSize: '16px',
    marginTop: '20px',
  };

  const inputBaseStyle: React.CSSProperties = {
    backgroundColor: '#2D4459',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    width: '100%', // Reste à 100% pour remplir l'espace
    boxSizing: 'border-box',
    fontSize: '16px',
    outline: 'none',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputBaseStyle,
    minHeight: '150px',
    resize: 'vertical',
    whiteSpace: 'pre-wrap',
  };

  
  const selectStyle: React.CSSProperties = {
    ...inputBaseStyle,
    appearance: 'none',
    paddingRight: '30px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#E76C5B',
    color: 'white',
    padding: '15px 0',
    borderRadius: '8px',
    border: 'none',
    width: '100%', // Reste à 100%
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '40px',
    marginBottom: '10px',
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center', // Ajout pour un meilleur centrage visuel
  };

  const formUlaire : React.CSSProperties = {
    height:'100%'
  }

  return (
    <div style={container}>
      <h2 style={titleStyle}>{titleText}</h2>
      <Form action={`/admin/dashboard/${endpoint}`} onSubmit={handleSubmit} style={formUlaire}>
        <div>
          <label htmlFor="titre" style={labelStyle}>{label}</label>
          <input
            type="text"
            id="titre"
            name="titre"
            style={inputBaseStyle}
            value={formData.title} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="contenu" style={labelStyle}>Contenu</label>
          <textarea
            id="contenu"
            name="contenu"
            style={textareaStyle}
            placeholder="le contenu................"
            rows={8}
            value={formData.contenu} 
            onChange={handleChange} 
          />
        </div>
        {isArticle? (<FileUpload />): null}
        <div>
          <label htmlFor="categorie" style={labelStyle}>Catégorie</label>
          <div style={{ position: 'relative' }}>
            {
            isArticle ? 
            <select
              id="categorie"
              name="categorie"
              style={selectStyle}
              value={formData.categorie} 
              onChange={handleChange} 
            >
              {rubriques.map((rubrique)=> <option key={rubrique} value={rubrique}>{rubrique}</option>)}
            </select> 
            : 
            <select
              id="categorie"
              name="categorie"
              style={selectStyle}
              value={formData.categorie} // 👈 Value lié à l'état
              onChange={handleChange} // 👈 Gestion du changement
            >
              <option value="Technologie"> Technologie </option>
              <option value="Politique"> Politique </option>
              <option value="Économie"> Économie </option>
            </select> }
          </div>
        </div>

        <button type="submit" style={buttonStyle}>
          Publier
        </button>
        
      </Form>
    </div>
  )
}