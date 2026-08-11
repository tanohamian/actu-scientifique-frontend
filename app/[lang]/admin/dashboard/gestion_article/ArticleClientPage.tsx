"use client";

import ButtonComponent from "@app/components/button";
import SearchBarComponent from "@app/components/searchBar";
import ArticleDataTable, { ElementType } from "@app/components/eventDataTable";
import React, { useState, useMemo } from "react";
import AddElementModal, { FormFieldConfig } from "@app/components/addElement";
import Filter, { IFilter } from "@app/components/filter";
import ComponenteFormulaire from "../newsletters/components/ComponenteFormulaire";
import { Rubriques } from "@app/enum/enums";
import { Article } from "@app/interfaces";
import { useTranslations } from "next-intl";

interface ArticleClientPageProps {
  initialArticles: Article[];
}

export default function ArticleClientPage({
  initialArticles,
}: ArticleClientPageProps) {
  const t = useTranslations("ArticleClientPage");

  const articleFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "title",
        label: t("fields.title"),
        type: "text",
        placeholder: t("fields.titlePlaceholder"),
        required: true,
      },
      {
        name: "content",
        label: t("fields.content"),
        type: "text",
        required: true,
      },
      {
        name: "rubrique",
        label: t("fields.rubrique"),
        type: "select",
        options: [
          {
            value: Rubriques.TECHNOLOGY,
            label: t("fields.rubriqueOptions.tech"),
          },
          {
            value: Rubriques.ONE_HEALTH,
            label: t("fields.rubriqueOptions.oneHealth"),
          },
          {
            value: Rubriques.ECO_HUMANITY,
            label: t("fields.rubriqueOptions.ecoHumanity"),
          },
        ],
        required: true,
      },
    ],
    [t],
  );

  const mainHeaders = useMemo(
    () => [
      { key: "title", label: t("headers.title"), flexBasis: "38%" },
      { key: "type", label: t("headers.type"), flexBasis: "12%" },
      { key: "rubrique", label: t("headers.category"), flexBasis: "15%" },
      { key: "createdAt", label: t("headers.publishedAt"), flexBasis: "20%" },
      { key: "actions", label: t("headers.actions"), flexBasis: "15%" },
    ],
    [t],
  );

  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editArticle, setEditArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [viewMode] = useState<"list" | "calendar">("list");

  const [articles] = useState<Article[]>(initialArticles);

  const filters: IFilter[] = useMemo(
    () =>
      mainHeaders.map((header) => ({
        value: header.key,
        label: header.label,
      })),
    [mainHeaders],
  );

  const handleArticle = () => {
    setIsOpen(true);
  };

  const handleSubmitArticle = async () => {
    setIsOpen(false);
  };

  let initialData = {
    title: "",
    content: "",
    createdAt: "",
    rubrique: "",
  };

  const handleEditArticle = (item: ElementType) => {
    console.log("Editing event:", item);
    setSelectedArticle(item as Article);
    setEditArticle(true);
  };

  const handleSubmitEditArticle = async () => {
    setEditArticle(false);
  };

  if (selectedArticle) {
    initialData = {
      title: (selectedArticle.title as string) || "",
      content: (selectedArticle.content as string) || "",
      createdAt: (selectedArticle.createdAt as string) || "",
      rubrique: (selectedArticle.rubrique as string) || "",
    };
  }

  const pageContainerClasses = `
        min-h-screen 
        font-sans
    `;

  const headerClasses = `
        flex 
        flex-col 
        md:flex-row 
        justify-between 
        items-start 
        md:items-center 
        mb-4 
        gap-4 
        md:gap-0
        p-5 
        md:p-10
    `;

  const textClasses = `
        m-0 
        text-2xl 
        md:text-3xl 
        lg:text-4xl 
        font-light
        text-white
    `;

  const subTextClasses = `
        text-white 
        text-sm 
        md:text-base 
        font-light
    `;

  const contentContainerClasses = `
        p-5 
        md:p-10
    `;

  const searchAndTabsClasses = `
        flex 
        flex-col 
        md:flex-row 
        items-center 
        gap-4 
        md:gap-5 
        my-5 
        md:my-8 
        justify-center 
        md:justify-between
    `;

  const searchBarWrapperClasses = `
        flex-grow 
        w-full 
        md:max-w-xl
    `;

  const rightSectionClasses = `
        w-full 
        lg:w-1/3 
        h-fit 
        flex-shrink-0 
        mt-8 
        lg:mt-0 
    `;

  return (
    <div className={pageContainerClasses}>
      <div className={headerClasses}>
        <div>
          <h1 className={textClasses}>{t("header.title")}</h1>
          <h3 className={subTextClasses}>{t("header.subtitle")}</h3>
        </div>
        <ButtonComponent
          textButton={t("header.addButton")}
          size="large"
          onclick={handleArticle}
        />
      </div>

      <div className={contentContainerClasses}>
        <div className={searchAndTabsClasses}>
          <div className={searchBarWrapperClasses}>
            <SearchBarComponent
              placeholder={t("search.placeholder")}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
          <Filter filters={filters} />
        </div>
        <article className="flex flex-col lg:flex-row gap-8">
          {viewMode === "list" ? (
            <ArticleDataTable
              tableTitle=""
              data={articles || []}
              columnHeaders={mainHeaders}
              handleEditEvent={handleEditArticle}
            />
          ) : null}
          <article className={rightSectionClasses}>
            <ComponenteFormulaire isArticle={true} />
          </article>
        </article>
      </div>

      <AddElementModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmitArticle}
        titleComponent={t("modals.addTitle")}
        buttonTitle={t("modals.addSubmit")}
        fields={articleFields}
        initialData={initialData}
      />

      <AddElementModal
        isOpen={editArticle}
        onClose={() => setEditArticle(false)}
        onSubmit={handleSubmitEditArticle}
        titleComponent={t("modals.editTitle")}
        buttonTitle={t("modals.editSubmit")}
        fields={articleFields}
        initialData={initialData}
      />
    </div>
  );
}
