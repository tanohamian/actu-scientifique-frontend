"use client";

import SearchBarComponent from "@app/components/searchBar";
import DataTable, { ElementType } from "@app/components/eventDataTable";
import { useEffect, useState, useMemo } from "react";
import AddElementModal, {
  FormFieldConfig,
  InitialDataType,
} from "@app/components/addElement";
import Filter, { IFilter } from "@app/components/filter";
import {
  DeleteArticle,
  FetchArticles,
  UpdateArticle,
} from "@app/actions/ArticleManager";
import FormComponent, { toast } from "@app/components/FormComponent";
import ConfirmModal from "@app/components/ConfirmModal";
import { Rubriques } from "@app/enum/enums";
import LoadingComponent from "@app/components/loadingComponent";
import { Article, DbArticle, IUpdateArticle, Product } from "@app/interfaces";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const EditorText = dynamic(() => import("@app/components/editor"), {
  ssr: false,
});

export default function ArticlePage() {
  const t = useTranslations("ArticlePage");

  const articleFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "title",
        label: t("fields.title"),
        placeholder: t("fields.titlePlaceholder"),
        required: true,
      },
      {
        name: "content",
        label: t("fields.content"),
        type: "description",
        required: true,
      },
      {
        name: "language",
        label: t("fields.language"),
        type: "select",
        options: [
          { label: t("fields.languageOptions.french"), value: "french" },
          { label: t("fields.languageOptions.english"), value: "english" },
        ],
      },
      {
        name: "file",
        label: t("fields.image"),
        placeholder: t("fields.imagePlaceholder"),
        type: "file",
      },
      {
        name: "rubrique",
        label: t("fields.rubrique"),
        type: "select",
        options: [
          {
            label: t("fields.rubriqueOptions.oneHealth"),
            value: Rubriques.ONE_HEALTH,
          },
          {
            label: t("fields.rubriqueOptions.technology"),
            value: Rubriques.TECHNOLOGY,
          },
          {
            label: t("fields.rubriqueOptions.ecoHumanity"),
            value: Rubriques.ECO_HUMANITY,
          },
          {
            label: t("fields.rubriqueOptions.portDiscovery"),
            value: Rubriques.PORT_DISCOVERY,
          },
        ],
        required: true,
      },
      {
        name: "une",
        label: t("fields.featured"),
        type: "select",
        options: [
          { label: t("fields.featuredOptions.yes"), value: 1 },
          { label: t("fields.featuredOptions.no"), value: 0 },
        ],
      },
    ],
    [t],
  );

  const articleUpdateFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "title",
        label: t("fields.title"),
        placeholder: t("fields.titlePlaceholder"),
      },
      { name: "content", label: t("fields.content"), type: "description" },
      {
        name: "file",
        label: t("fields.image"),
        placeholder: t("fields.imagePlaceholder"),
        type: "file",
      },
      {
        name: "language",
        label: t("fields.language"),
        type: "select",
        options: [
          { label: t("fields.languageOptions.french"), value: "french" },
          { label: t("fields.languageOptions.english"), value: "english" },
        ],
      },
      {
        name: "rubrique",
        label: t("fields.rubrique"),
        type: "select",
        options: [
          {
            label: t("fields.rubriqueOptions.oneHealth"),
            value: Rubriques.ONE_HEALTH,
          },
          {
            label: t("fields.rubriqueOptions.technology"),
            value: Rubriques.TECHNOLOGY,
          },
          {
            label: t("fields.rubriqueOptions.ecoHumanity"),
            value: Rubriques.ECO_HUMANITY,
          },
          {
            label: t("fields.rubriqueOptions.portDiscovery"),
            value: Rubriques.PORT_DISCOVERY,
          },
        ],
      },
      {
        name: "une",
        label: t("fields.featured"),
        type: "select",
        options: [
          { label: t("fields.featuredOptions.yes"), value: 1 },
          { label: t("fields.featuredOptions.no"), value: 0 },
        ],
      },
    ],
    [t],
  );

  const mainHeaders = useMemo(
    () => [
      { key: "title", label: t("headers.title"), flexBasis: "38%" },
      { key: "rubrique", label: t("headers.rubrique"), flexBasis: "20%" },
      { key: "createdAt", label: t("headers.publishedAt"), flexBasis: "25%" },
      { key: "actions", label: t("headers.actions"), flexBasis: "15%" },
    ],
    [t],
  );

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editArticle, setEditArticle] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);

  const [articles, setArticles] = useState<DbArticle[]>([]);

  const pageContainerClasses = `
        font-sans
        h-320
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
        lg:w-1/2 
        h-fit 
        ml-auto
        flex-shrink-0 
        mt-8 
        lg:mt-0 
    `;

  const handleSubmitArticle = (newArticle?: DbArticle) => {
    console.log("newArticle : ", newArticle);
    if (!newArticle) {
      alert(t("toasts.noArticle"));
      return;
    }
    newArticle.createdAt = newArticle.createdAt.toLocaleString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      year: "numeric",
      month: "2-digit",
    });
    setArticles((prevState) => [...prevState, newArticle]);
    setSelectedArticle(null);
    setEditArticle(false);
  };

  const emptyData: InitialDataType = {
    title: "",
    content: "",
    illustrationUrl: "",
    createdAt: new Date().toLocaleDateString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
    rubrique: "",
    une: false,
  };

  const handleEditArticle = async (item: ElementType) => {
    console.log("item article : ", item);
    setSelectedArticle(item as Article);
    setEditArticle(true);
  };

  const handleDeleteArticle = (item: ElementType) => {
    setArticleToDelete(item as Article);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteArticle = async () => {
    if (!articleToDelete) return;
    setIsDeleteModalOpen(false);
    setArticles(
      articles.filter((newItem) => newItem.id !== articleToDelete.id),
    );
    const res = await DeleteArticle(articleToDelete.id as string);
    toast(
      res,
      false,
      res ? t("toasts.deleteSuccess") : t("toasts.deleteError"),
    );
    setArticleToDelete(null);
  };

  const editInitialData: InitialDataType | null = selectedArticle
    ? {
        title: (selectedArticle.title as string) || "",
        content: (selectedArticle.content as string) || "",
        rubrique: (selectedArticle.rubrique as Rubriques) || "",
        une: (selectedArticle.une as boolean) || false,
        illustrationUrl: selectedArticle.illustrationUrl,
        createdAt: (selectedArticle.createdAt as string) || "",
      }
    : null;

  const handleSubmitEditArticle = async (data: InitialDataType | Product) => {
    setIsLoading(true);
    try {
      data = data as InitialDataType;
      const article = new FormData();
      article.append("title", data.title as string);
      article.append("content", data.content as string);
      article.append("rubrique", data.rubrique as Rubriques);
      article.append("une", data.une as string);

      if (data.file && data.file instanceof File) {
        article.append("file", data.file);
      }

      const response = await UpdateArticle(data.id as string, article);
      setArticles((prev) =>
        prev.map((art) => (art.id === response?.id ? response : art)),
      );
      setSelectedArticle(null);
      setEditArticle(false);

      toast(true, false, t("toasts.updateSuccess"));
    } catch (error) {
      console.log("❌ Erreur:", error);
      toast(false, false, t("toasts.updateError"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchArtcicles = async () => {
      try {
        const response = (await FetchArticles()) as DbArticle[];
        console.log({ response });
        if (response) {
          setArticles(
            response.map((article) => {
              const createdAt = new Date(article.createdAt);
              article.createdAt = createdAt.toLocaleString("fr");
              console.log("date de création : ", article.createdAt);
              return article;
            }),
          );
          setIsLoading(false);
        }
      } catch (err) {
        console.log("erreur lors de la recuperations des utilisateurs : ", err);
      }
    };

    fetchArtcicles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const search = inputValue.trim().toLowerCase();

    if (!search) return true;

    return (
      article.title?.toLowerCase().includes(search) ||
      article.rubrique?.toLowerCase().includes(search) ||
      article.content?.toLowerCase().includes(search)
    );
  });

  return (
    <div className={pageContainerClasses}>
      <LoadingComponent
        isOpen={isLoading}
        onClose={() => setIsLoading(false)}
      />
      <div className={headerClasses}>
        <div>
          <h1 className={textClasses}>{t("header.title")}</h1>
          <h3 className={subTextClasses}>{t("header.subtitle")}</h3>
        </div>
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
        </div>
        <article className="flex flex-col items-start lg:flex-row gap-8 h-fit">
          <DataTable
            tableTitle=""
            data={filteredArticles}
            columnHeaders={mainHeaders}
            handleEditEvent={handleEditArticle}
            handleDeleteEvent={handleDeleteArticle}
          />

          <article className={rightSectionClasses}>
            <FormComponent
              isArticle={true}
              initialArticleData={emptyData}
              fields={articleFields}
              onSuccess={handleSubmitArticle}
            />
          </article>
        </article>
      </div>

      <AddElementModal
        key={editArticle ? "new-media-open" : "new-media-closed"}
        isOpen={editArticle}
        onClose={() => {
          setEditArticle(false);
        }}
        onSubmit={handleSubmitEditArticle}
        titleComponent={t("modals.editTitle")}
        buttonTitle={t("modals.editSubmit")}
        fields={articleUpdateFields}
        initialData={editInitialData ?? emptyData}
        id={selectedArticle?.id}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteArticle}
        title={t("modals.deleteTitle")}
      />
    </div>
  );
}
