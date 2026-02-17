"use client"
import React, { FormEvent, useState, useEffect, useMemo } from 'react';
import { AddNewsletter, INewsletter, UpdateNewsletter } from "@app/actions/Newsletters";
import { ChevronDown, Upload } from 'lucide-react';
import { FormFieldConfig, InitialDataType, uploadIcon, uploadText } from '@app/components/addElement';
import { showToast } from "nextjs-toast-notify"
import { Rubriques } from '../enum/enums';
import { Article, DbArticle, Newsletter } from '../interfaces';
import dynamic from 'next/dynamic'


const EditorText = dynamic(
    () => import('@app/components/titap'),
    { ssr: false }
)

export const toast = function (success: boolean, edit: boolean = false, message: string = "") {
  return success ? showToast.success(message ? message : edit ? "Publié!" : "Mis à Jour !", {
    duration: 4000,
    progress: true,
    position: "bottom-center",
    transition: "bounceIn",
    icon: '✅',
    sound: true,
  }) :
    showToast.error("Opération échouée", {
      duration: 4000,
      progress: true,
      position: "bottom-center",
      transition: "bounceIn",
      icon: '❌',
      sound: true,
    });
}
interface FormPropos {
  isArticle: boolean;
  fields?: FormFieldConfig[];
  initialData?: Newsletter | Article | null;
  initialArticleData: InitialDataType;
  onSuccess: (item?: DbArticle) => void;
  setter?: (value: React.SetStateAction<DbArticle | undefined>) => void
}

export default function FormComponent({ isArticle = false, initialData, onSuccess, fields, initialArticleData = {} }: FormPropos) {
  const rubriques = Object.values(Rubriques) as string[];

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<Article | INewsletter>({
    title: "",
    content: "",
    createdAt: "2025-06-11T15:38:44.000Z",

  });

  const initialFormData = useMemo(() => {
    return (fields as FormFieldConfig[]).reduce((acc, field) => {
      acc[field.name] = initialArticleData[field.name] !== undefined ? initialArticleData[field.name] : '';
      return acc;
    }, {} as InitialDataType);
  }, [fields, initialArticleData]);
  const [articleFormData, setArticleFormData] = useState<InitialDataType>(initialFormData);
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null | undefined>("");

  useEffect(() => {
    const set = async () => {
      setArticleFormData(initialFormData);
      setImageUrl(initialArticleData['illustrationUrl'] as string);

    }
    if (isArticle) {
      set()
      return
    }
    const initiateDatas = async () => {
      if (initialData) {
        const title = initialData.title || "";
        const content = initialData.content || "";
        const rubrique = ('categorie' in initialData)
          ? initialData.categorie as Rubriques
          : ('rubrique' in initialData ? initialData.rubrique : Rubriques.TECHNOLOGY);


        setFormData({ title, content, rubrique });
      } else {
        setFormData({ title: "", content: "", rubrique: Rubriques.TECHNOLOGY });
      }
    }
    initiateDatas()

  }, [initialData, initialFormData, isArticle, initialArticleData]);


  const isEditing = !!initialData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  const handleArticleChange = (name: string, value: string | File, type?: string) => {
    setArticleFormData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? Number(value) : type === 'file' ? value as File : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      let result: DbArticle | undefined | { success: boolean };
      const currentId = initialData?.id;
      if (isArticle) {
        const article = new FormData()
        article.append('title', articleFormData["title"] as string)
        article.append('content', articleFormData["content"] as string)
        article.append('rubrique', articleFormData["rubrique"] as string)
        article.append('file', articleFormData["file"] as File)
        article.append('une', articleFormData["une"] as string);
        console.log("Aperçu de l'article : ")
        console.log(article)

        console.log("📤 Envoi vers /api/upload-article");

        const response = await fetch('/api/upload-article', {
          method: 'POST',
          body: article,
        });

        console.log("📨 Réponse reçue:", response.status);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Erreur lors de l\'upload');
        }

        const result = await response.json();
        console.log("✅ Média uploadé:", result);

        if (result) {

          toast(true, isEditing);
          const newArticle = result.article as DbArticle;
          newArticle.createdAt = newArticle.createdAt.toLocaleString('fr-FR', { year: "numeric", month: "2-digit", day: "2-digit" })
          console.log(result)
          setFormData({ title: "", content: "", rubrique: Rubriques.TECHNOLOGY });
          onSuccess(newArticle);
        }
        else {
          toast(false);
        }
        return
      }

      if (isEditing && currentId) {
        result = await UpdateNewsletter(currentId, formData as INewsletter);
      } else {
        result = await AddNewsletter(formData as INewsletter);
      }

      if (result) {
        toast(true, isEditing);
        console.log(result)
        setFormData({ title: "", content: "", rubrique: Rubriques.TECHNOLOGY });
        await onSuccess();
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const container: React.CSSProperties = { backgroundColor: '#50789B', maxWidth: '100%', width: '90%', padding: '30px', fontFamily: 'Arial, sans-serif', borderRadius: '25px', margin: '0 auto', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { color: 'white', fontWeight: 'bold', marginBottom: '8px', display: 'block', fontSize: '25px', marginTop: '20px' };
  const inputBaseStyle: React.CSSProperties = { backgroundColor: '#2D4459', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', width: '100%', boxSizing: 'border-box', fontSize: '16px', outline: 'none' };
  const textareaStyle: React.CSSProperties = { ...inputBaseStyle, minHeight: '150px', resize: 'vertical' };
  const selectStyle: React.CSSProperties = { ...inputBaseStyle, appearance: 'none' };
  const buttonStyle: React.CSSProperties = { backgroundColor: '#E76C5B', color: 'white', padding: '15px 0', borderRadius: '8px', border: 'none', width: '100%', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px' };

  const renderField = (field: FormFieldConfig) => {
    const containerClasses = "flex flex-col gap-1";

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className={containerClasses}>
            <label style={labelStyle}>{field.label}</label>
            <div className="relative w-full">
              <select
                style={selectStyle}
                value={(articleFormData[field.name] as string) || ''}
                onChange={(e) => handleArticleChange(field.name, e.target.value)}
                required={field.required}
              >
                <option value="" disabled className="text-white/50">Sélectionner {field.label.toLowerCase()}</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white" />
            </div>
          </div>
        );
      case 'file':
        return (
          <div key={field.name} className={containerClasses}>
            <label style={labelStyle}>{field.label}</label>
            <label className="cursor-pointer">
              <input
                type={field.type}
                accept="image/*"
                style={{ display: 'none' }}
                placeholder={field.placeholder || ''}
                onChange={(e) => {

                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleArticleChange(field.name, file as File, 'file');
                      setImageUrl(reader.result)
                    };
                    reader.readAsDataURL(file)
                  };
                }}
                required={field.required}
              />
              {articleFormData[field.name] || imageUrl ? (
                <div className="mt-2">

                  {/* eslint-disable-next-line @next/next/no-img-element*/}
                  <img src={imageUrl as string} alt="Preview" className="max-w-full h-auto rounded-lg" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-[#00283C99] rounded-lg p-10 cursor-pointer">
                  <Upload size={40} style={uploadIcon} />
                  <div style={uploadText}>cliquez pour uploader une image</div>
                </div>
              )}
            </label>
          </div>
        );

      case 'text':
      case 'email':
      case 'password':
      case 'textarea':
        return (
          <div key={field.name} className={containerClasses}>
            <label style={labelStyle}>{field.label}</label>
            <textarea
              style={textareaStyle}
              placeholder={field.placeholder || ''}
              rows={6}
              value={(articleFormData[field.name] as string) || ''}
              onChange={(e) => handleArticleChange(field.name, e.target.value, field.type)}
              required={field.required}
            />
          </div>
        )
      case 'description':
               return(
                    <div key={field.name} className={containerClasses}>
                        <label style={labelStyle}>{field.label}</label>
                        <EditorText 
                            content={(articleFormData[field.name] as string) || ''} 
                            onChange={(html) => handleArticleChange(field.name, html)}
                        />
                    </div>
                );
      case 'number':
      default:
        return (
          <div key={field.name} className={containerClasses}>
            <label style={labelStyle}>{field.label}</label>
            <input
              type={field.type}
              style={inputBaseStyle}
              placeholder={field.placeholder || ''}
              value={(articleFormData[field.name] as string) || ''}
              onChange={(e) => handleArticleChange(field.name, e.target.value, field.type)}
              required={field.required}
            />
          </div>
        );
    }
  };

  return (
    <div style={container}>

      <h2 style={{ color: 'white', textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>
        {isEditing ? "Modifier" : (isArticle ? "Ajouter un Article" : "Nouvelle NewsLetter")}
      </h2>
      {
        isArticle ?
          <form onSubmit={handleSubmit}>
            {(fields as FormFieldConfig[]).map(field => renderField(field))}
            <button type="submit" style={buttonStyle}>
              {isEditing ? "Enregistrer les modifications" : "Publier"}
            </button>
          </form> :
          <form onSubmit={handleSubmit}>
            <div>
              <label style={labelStyle}>{"Titre de la NewsLetter"}</label>
              <input
                type="text"
                id="titre"
                name="titre"
                style={inputBaseStyle}
                value={(formData as Article).title}
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
                value={(formData as Article).content}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Rubrique</label>
              <select
                name="categorie"
                style={selectStyle}
                value={(formData as Article).rubrique}
                onChange={handleChange}
              >
                {rubriques.map((rub) => (
                  <option key={rub} value={rub}>{rub}</option>
                ))}
              </select>
            </div>
            {isLoading ? 
            <button type="submit" style={buttonStyle}>
              {isEditing ? "Enregistrement en cours..." : "Publication en cours..."}
            </button> : <button type="submit" style={buttonStyle}>
              {isEditing ? "Enregistrer les modifications" : "Publier"}
            </button>
            }
          </form>
      }

    </div>
  );
}