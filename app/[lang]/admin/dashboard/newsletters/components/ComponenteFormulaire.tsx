"use client";

import React, { useState, useEffect, useMemo } from "react";
import { AddNewsletter, UpdateNewsletter } from "@app/actions/Newsletters";
import { Rubriques } from "@app/enum/enums";
import { Newsletter } from "@app/interfaces";
import { toast } from "@app/components/FormComponent";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const EditorText = dynamic(() => import("@app/components/titap"), {
  ssr: false,
});

interface IFormData {
  title: string;
  content: string;
  categorie: string;
}

interface FormPropos {
  isArticle?: boolean;
  initialData?: Newsletter | null;
  onSuccess?: () => void;
}

export default function ComponenteFormulaire({
  isArticle = false,
  initialData,
  onSuccess,
}: FormPropos) {
  const t = useTranslations("ComponenteFormulaire");

  const rubriquesOptions = useMemo(
    () => [
      { label: t("options.selectRubrique"), value: "" },
      { label: t("options.oneHealth"), value: Rubriques.ONE_HEALTH },
      { label: t("options.technology"), value: Rubriques.TECHNOLOGY },
      { label: t("options.ecoHumanity"), value: Rubriques.ECO_HUMANITY },
      { label: t("options.portDiscovery"), value: Rubriques.PORT_DISCOVERY },
    ],
    [t],
  );

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
    };
    initiateDatas();
  }, [initialData]);

  const isEditing = !!initialData;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    console.log("Changement de valeur:", e.target.name, e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (dataToSubmit: IFormData) => {
    if (
      !dataToSubmit.title ||
      !dataToSubmit.content ||
      !dataToSubmit.categorie
    ) {
      toast(false, false, t("toasts.fillAllFields"));
      return;
    }
    try {
      let result;
      const currentId = initialData?.id;

      if (isEditing && currentId) {
        result = await UpdateNewsletter(currentId, dataToSubmit);
      } else {
        result = await AddNewsletter(dataToSubmit);
      }

      if (result?.success) {
        setFormData({ title: "", content: "", categorie: "" });
        toast(
          true,
          isEditing,
          isEditing ? t("toasts.updateSuccess") : t("toasts.createSuccess"),
        );
        if (onSuccess) onSuccess();
      } else {
        toast(false, false, t("toasts.genericError"));
      }
      console.log("Résultat de la soumission:", result);
    } catch (error) {
      console.error("Erreur:", error);
      toast(false, false, t("toasts.genericError"));
    }
  };

  const container: React.CSSProperties = {
    backgroundColor: "#50789B",
    maxWidth: "1200px",
    width: "100%",
    fontFamily: "Arial, sans-serif",
    borderRadius: "25px",
    margin: "0 auto",
    boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    color: "white",
    fontWeight: "bold",
    marginBottom: "8px",
    display: "block",
    marginTop: "20px",
  };
  const inputBaseStyle: React.CSSProperties = {
    backgroundColor: "#2D4459",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "16px",
    outline: "none",
  };
  const selectStyle: React.CSSProperties = {
    ...inputBaseStyle,
    appearance: "none",
  };
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#E76C5B",
    color: "white",
    padding: "15px 0",
    borderRadius: "8px",
    border: "none",
    width: "100%",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "40px",
  };

  return (
    <div className="p-5 md:p-10" style={container}>
      <h2
        className="text-2xl md:text-4xl"
        style={{
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        {isEditing
          ? t("title.edit")
          : isArticle
            ? t("title.addArticle")
            : t("title.addNewsletter")}
      </h2>
      <article>
        <div>
          <label className="text-lg md:text-2xl" style={labelStyle}>
            {isArticle ? t("labels.articleTitle") : t("labels.newsletterTitle")}
          </label>
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
          <label className="text-lg md:text-2xl" style={labelStyle}>
            {t("labels.content")}
          </label>
          <EditorText
            content={formData.content}
            onChange={(html) =>
              setFormData((prev) => ({ ...prev, content: html }))
            }
          />
        </div>
        <div>
          <label className="text-lg md:text-2xl" style={labelStyle}>
            {t("labels.rubrique")}
          </label>
          <select
            name="categorie"
            style={selectStyle}
            value={formData.categorie}
            onChange={handleChange}
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
          {isEditing ? t("buttons.save") : t("buttons.publish")}
        </button>
      </article>
    </div>
  );
}
