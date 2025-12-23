"use client"
import React, { FormEvent, useState } from 'react';
import { FileUpload } from "../../produit_commandes/components/FileUpload";
import AddArticle from "@/app/actions/addArticle";
import { Article } from "./Affichage";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export enum Rubriques {
    HEALTH = "une seule santé",
    TECHNOLOGY = "tech",
    ECOHUMANITY = "éco-humanité",
    OPPORTUNITY = "opportunité",
    CALENDAR = "agenda",
    PORTRAITSDISCOVERIES = "portraits et découvertes"
}

interface FormPropos {
    isArticle: boolean
}

export default function ComponenteFormulaire({ isArticle = false }: FormPropos) {
    const rubriques = Object.values(Rubriques) as string[];
    const titleText = isArticle ? "Ajouter un Article" : "Formulaire de News Letters"
    const label = isArticle ? "Titre de l'article" : "Titre de la News Letter"

    const [formData, setFormData] = useState({
        titre: "",
        contenu: "",
        categorie: isArticle ? rubriques[0] : "tech",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (isArticle) {
                // Correction des clés ici pour correspondre à l'interface Article
                const newArticle: Article = {
                    titre: formData.titre,
                    contenu: formData.contenu,
                    rubrique: formData.categorie,
                };
                await AddArticle(newArticle);
                alert(`Article soumis !`);
                setFormData({ titre: "", contenu: "", categorie: rubriques[0] });
            } else {
                const response = await fetch(`${BASE_URL}/newsletters`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        titre: formData.titre,
                        contenu: formData.contenu,
                        categorie: formData.categorie
                    }),
                });

                if (response.ok) {
                    alert(`Newsletter soumise ! Titre : ${formData.titre}`);
                    setFormData({ titre: "", contenu: "", categorie: "tech" });
                } else {
                    alert("Erreur lors de l'envoi de la newsletter");
                }
            }
        } catch (error) {
            console.error("Erreur détaillée:", error);
        }
    };

    // --- TES STYLES (STRICTEMENT INCHANGÉS) ---
    const container: React.CSSProperties = { backgroundColor: '#50789B', maxWidth: '500px', width: '90%', minHeight: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif', borderRadius: '25px', margin: '20px auto', boxSizing: 'border-box' };
    const labelStyle: React.CSSProperties = { color: 'white', fontWeight: 'bold', marginBottom: '8px', display: 'block', fontSize: '16px', marginTop: '20px' };
    const inputBaseStyle: React.CSSProperties = { backgroundColor: '#2D4459', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', width: '100%', boxSizing: 'border-box', fontSize: '16px', outline: 'none' };
    const textareaStyle: React.CSSProperties = { ...inputBaseStyle, minHeight: '150px', resize: 'vertical', whiteSpace: 'pre-wrap' };
    const selectStyle: React.CSSProperties = { ...inputBaseStyle, appearance: 'none', paddingRight: '30px' };
    const buttonStyle: React.CSSProperties = { backgroundColor: '#E76C5B', color: 'white', padding: '15px 0', borderRadius: '8px', border: 'none', width: '100%', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px', marginBottom: '10px' };
    const titleStyle: React.CSSProperties = { color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' };

    return (
        <div style={container}>
            <h2 style={titleStyle}>{titleText}</h2>
            {/* Utilisation de la balise form standard pour la stabilité du onSubmit */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titre" style={labelStyle}>{label}</label>
                    <input
                        type="text"
                        id="titre"
                        name="titre"
                        style={inputBaseStyle}
                        value={formData.titre}
                        onChange={handleChange}
                        required
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
                        required
                    />
                </div>
                {isArticle ? (<FileUpload />) : null}
                <div>
                    <label htmlFor="categorie" style={labelStyle}>Catégorie</label>
                    <div style={{ position: 'relative' }}>
                        <select
                            id="categorie"
                            name="categorie"
                            style={selectStyle}
                            value={formData.categorie}
                            onChange={handleChange}
                        >
                            {rubriques.map((rubrique) => (
                                <option key={rubrique} value={rubrique}>
                                    {rubrique}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" style={buttonStyle}>
                    Publier
                </button>
            </form>
        </div>
    )
}