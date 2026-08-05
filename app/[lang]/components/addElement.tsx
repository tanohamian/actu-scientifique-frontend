"use client";
import ButtonComponent from "@components/button";
import React, { useState, useEffect, useMemo } from "react";
import { X, ChevronDown, Upload } from "lucide-react";
import { Rubriques } from "../enum/enums";
import { Product } from "../interfaces";
import dynamic from "next/dynamic";
import MediaPreview from "./MediaPreview";

const EditorText = dynamic(() => import("@components/titap"), { ssr: false });

/**
 * Interface for form field configuration
 */
export interface FormFieldConfig {
  name: string;
  label: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "select"
    | "textarea"
    | "file"
    | "number"
    | "date"
    | "time"
    | "url"
    | "description";
  placeholder?: string;
  required?: boolean;
  options?: { value: string | number; label: string }[];
  conditionalField?: {
    dependsOn: string;
    showWhen: string | number;
  };
}

export type InitialDataType = {
  [key: string]: string | number | File | undefined | Rubriques | boolean;
};

/**
 * Props for the AddElementModal component
 */
interface AddElementModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Product | InitialDataType,
    id?: string,
  ) => Promise<void> | void;
  titleComponent: string;
  buttonTitle: string;
  fields: FormFieldConfig[];
  initialData?: InitialDataType;
  isLoading?: boolean;
}

const customStyles = `
    .custom-select option {
        background-color: #2d4f6b;
        color: white;
    }
    .custom-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

export const uploadText: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.7)",
  fontSize: "14px",
};

export const uploadIcon: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.6)",
  marginBottom: "10px",
};

/**
 *
 * @param {AddElementModalProps} param
 * @returns
 */

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

export default function AddElementModal(props: AddElementModalProps) {
  const [imageUrl, setImageUrl] = useState<string>(() => {
    return (
      (props.initialData?.illustrationUrl as string) ||
      (props.initialData?.url as string) ||
      ""
    );
  });
  const initialFormData = useMemo(() => {
    const data = props.fields.reduce((acc, field) => {
      acc[field.name] = props.initialData![field.name] ?? "";
      return acc;
    }, {} as InitialDataType);

    if (props.id) {
      data["id"] = props.id;
    }

    return data;
  }, [props.fields, props.initialData, props.id]);

  /*useEffect(() => {
    const updateImage = () => {
      if (props.initialData?.illustrationUrl) {
        setImageUrl(props.initialData.illustrationUrl as string);
      }
    };
    updateImage();
  }, [props.initialData?.illustrationUrl]);*/

  /*useEffect(() => {
  const source =
    (props.initialData?.illustrationUrl as string) ||
    (props.initialData?.url as string) ||
    "";
  if (source) {
    setImageUrl(source);
  }
}, [props.initialData?.illustrationUrl, props.initialData?.url]);*/

  //const [isImage, setIsImage] = useState(false);
  const [formData, setFormData] = useState<InitialDataType>(
    () => initialFormData,
  );
  /*useEffect(() => {
    const set = async () => {
      setFormData(initialFormData);
    };
    set();
  }, [initialFormData, props.isOpen]);*/

  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [props.isOpen]);

  if (!props.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onSubmit(formData as InitialDataType, props.id);
  };

  const handleChange = (name: string, value: string | File, type?: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        value instanceof File
          ? value
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const shouldShowField = (field: FormFieldConfig): boolean => {
    if (!field.conditionalField) return true;

    const { dependsOn, showWhen } = field.conditionalField;
    return formData[dependsOn] === showWhen;
  };

  const renderField = (field: FormFieldConfig) => {
    if (!shouldShowField(field)) return null;

    const inputClasses =
      "w-full p-3 md:p-3.5 rounded-lg border-none bg-[#2d4f6b] text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300 custom-input";
    const labelClasses =
      "text-white text-sm md:text-base mb-1 font-medium font-sans";
    const containerClasses = "flex flex-col gap-1";

    switch (field.type) {
      case "select":
        return (
          <div key={field.name} className={containerClasses}>
            <label className={labelClasses}>{field.label}</label>
            <div className="relative w-full">
              <select
                className={`${inputClasses} appearance-none cursor-pointer custom-select`}
                value={(formData[field.name] as string) || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
              >
                <option value="" disabled className="text-white/50">
                  Sélectionner {field.label.toLowerCase()}
                </option>
                {field.options?.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white"
              />
            </div>
          </div>
        );

      case "file": {
        const selectedFile = formData[field.name] as File | undefined;
        const mimeType =
          selectedFile?.type || (props.initialData?.mimeType as string) || "";

        return (
          <div key={field.name} className={containerClasses}>
            <label className={labelClasses}>{field.label}</label>

            {/* Aperçu du média existant / nouveau */}
            {imageUrl && (
              <div className="mb-3 flex flex-col items-center gap-2 bg-[#00283C99] p-4 rounded-lg">
                <MediaPreview src={imageUrl} mimeType={mimeType} />
              </div>
            )}

            {/* Input de sélection pour ajouter/remplacer le média */}
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*,video/*,audio/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleChange(field.name, file);
                    const objectUrl = URL.createObjectURL(file);
                    setImageUrl(objectUrl);
                  }
                }}
                required={field.required && !imageUrl}
              />
              <div className="flex flex-col items-center justify-center bg-[#00283C99] rounded-lg p-6 cursor-pointer border-2 border-dashed border-white/20 hover:border-white/40 transition">
                <Upload size={30} style={uploadIcon} />
                <div style={uploadText}>
                  {imageUrl
                    ? "Changer le fichier média (uploader un nouveau)"
                    : "Cliquez pour uploader un fichier (Vidéo, Audio, Image)"}
                </div>
              </div>
            </label>
          </div>
        );
      }
      case "textarea":
        return (
          <div key={field.name} className={containerClasses}>
            <label className={labelClasses}>{field.label}</label>
            <textarea
              rows={4}
              className={inputClasses}
              placeholder={field.placeholder || ""}
              value={(formData[field.name] as string) || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value, field.type)
              }
              required={field.required}
            />
          </div>
        );
      case "date":
        return (
          <div key={field.name} className={containerClasses}>
            <label className={labelClasses}>{field.label}</label>
            <input
              type="date"
              className={inputClasses}
              placeholder={field.placeholder || ""}
              value={(formData[field.name] as string) || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value, field.type)
              }
              required={field.required}
              lang="fr-FR"
            />
          </div>
        );
      case "time":
        return (
          <div key={field.name} className={containerClasses}>
            <label className={labelClasses}>{field.label}</label>
            <input
              type="time"
              className={inputClasses}
              placeholder={field.placeholder || ""}
              value={(formData[field.name] as string) || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value, field.type)
              }
              required={field.required}
              lang="fr-FR"
            />
          </div>
        );
      case "description":
        return (
          <div key={field.name} className={containerClasses}>
            <label className={labelClasses}>{field.label}</label>
            <EditorText
              content={(formData[field.name] as string) || ""}
              onChange={(html) => handleChange(field.name, html)}
            />
          </div>
        );
      case "url": {
        const value = (formData[field.name] as string) || "";
        const youtubeEmbedUrl = getYouTubeEmbedUrl(value); // Détection YouTube

        return (
          <div key={field.name} className={containerClasses}>
            <label className={labelClasses}>{field.label}</label>
            <input
              type="url"
              className={inputClasses}
              placeholder={field.placeholder || ""}
              value={value}
              onChange={(e) =>
                handleChange(field.name, e.target.value, field.type)
              }
              required={field.required}
            />
            {value && (
              <div className="mt-2 flex flex-col items-center gap-2 bg-[#00283C99] p-4 rounded-lg w-full">
                {youtubeEmbedUrl ? (
                  <iframe
                    className="w-full aspect-video rounded-lg"
                    src={youtubeEmbedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <MediaPreview
                    src={value}
                    mimeType={props.initialData?.mimeType as string}
                  />
                )}
              </div>
            )}
          </div>
        );
      }
      case "text":
      case "email":
      case "password":
      case "number":
      default:
        return (
          <div key={field.name} className={containerClasses}>
            <label className={labelClasses}>{field.label}</label>
            <input
              type={field.type || "text"}
              className={inputClasses}
              placeholder={field.placeholder || ""}
              value={(formData[field.name] as string) || ""}
              onChange={(e) =>
                handleChange(field.name, e.target.value, field.type)
              }
              required={field.required}
            />
          </div>
        );
    }
  };

  const overlayClasses =
    "fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 md:p-8";

  const modalClasses =
    "bg-[#5A8FAC] rounded-xl p-6 md:p-8 w-full max-w-1/2 max-h-[90vh] overflow-y-auto relative";

  const headerClasses = "flex justify-between items-center mb-6";

  const titleClasses = "text-xl md:text-2xl font-bold text-white m-0 font-sans";

  const closeButtonClasses =
    "bg-transparent border-none text-white cursor-pointer p-1 flex items-center hover:text-red-300 transition";

  const formClasses = "flex flex-col gap-4";

  return (
    <div className={overlayClasses} onClick={props.onClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        <div className={headerClasses}>
          <h2 className={titleClasses}>{props.titleComponent}</h2>
          <button
            className={closeButtonClasses}
            onClick={props.onClose}
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={formClasses}>
          {props.fields.map((field) => renderField(field))}
          {props.isLoading ? (
            <div className="mt-4 flex justify-center">
              <ButtonComponent textButton="Chargement..." size="medium" />
            </div>
          ) : (
            <div className="mt-4 flex justify-center">
              <ButtonComponent textButton={props.buttonTitle} size="medium" />
            </div>
          )}
        </form>
      </div>

      <style jsx global>
        {customStyles}
      </style>
    </div>
  );
}
