"use client";

import SearchBarComponent from "@app/components/searchBar";
import DataTable, { ElementType } from "@app/components/eventDataTable";
import { useEffect, useState } from "react";
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
import { Rubriques } from "@app/enum/enums";
import LoadingComponent from "@app/components/loadingComponent";
import { Article, DbArticle, IUpdateArticle, Product } from "@app/interfaces";
import dynamic from "next/dynamic";

const EditorText = dynamic(() => import("@app/components/editor"), {
  ssr: false,
});

const ArticleFields: FormFieldConfig[] = [
  {
    name: "title",
    label: "Titre de l'article",
    placeholder: "Entrez le titre de l'article",
    required: true,
  },
  { name: "content", label: "Contenu", type: "description", required: true },
  {
    name: "file",
    label: "Image",
    placeholder: "Ajoutez une illustration",
    type: "file",
  },
  {
    name: "rubrique",
    label: "Rubrique",
    type: "select",
    options: [
      { label: "Une seule santé", value: Rubriques.ONE_HEALTH },
      { label: "Technologie", value: Rubriques.TECHNOLOGY },
      { label: "Éco-humanité", value: Rubriques.ECO_HUMANITY },
      { label: "Portrait et découvertes", value: Rubriques.PORT_DISCOVERY },
    ],
    required: true,
  },
  {
    name: "une",
    label: "Mettre à la une",
    type: "select",
    options: [
      { label: "Oui", value: 1 },
      { label: "Non", value: 0 },
    ],
  },
];

const articleUpdateFields: FormFieldConfig[] = [
  {
    name: "title",
    label: "Titre de l'article",
    placeholder: "Entrez le titre de l'article",
  },
  { name: "content", label: "Contenu", type: "description" },
  {
    name: "file",
    label: "Image",
    placeholder: "Ajoutez une illustration",
    type: "file",
  },
  {
    name: "rubrique",
    label: "Rubrique",
    type: "select",
    options: [
      { label: "Une seule santé", value: Rubriques.ONE_HEALTH },
      { label: "Technologie", value: Rubriques.TECHNOLOGY },
      { label: "Éco-humanité", value: Rubriques.ECO_HUMANITY },
      { label: "Portrait et découvertes", value: Rubriques.PORT_DISCOVERY },
    ],
  },
  {
    name: "une",
    label: "Mettre à la une",
    type: "select",
    options: [
      { label: "Oui", value: 1 },
      { label: "Non", value: 0 },
    ],
  },
];

const mainHeaders = [
  { key: "title", label: "Titre", flexBasis: "38%" },
  { key: "rubrique", label: "Rubrique", flexBasis: "20%" },
  { key: "createdAt", label: "Date de publication", flexBasis: "25%" },
  { key: "actions", label: "Actions", flexBasis: "15%" },
];

//const TABS_INACTIVE_COLOR = '#5A8FAC';

export default function ArticlePage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editArticle, setEditArticle] = useState(false);
  //const [selectedFilter, setSelectedFilter] = useState("title");

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  /*const [filters] = useState<IFilter[]>(
    mainHeaders
      .filter((m) => m.key !== "actions")
      .map((header) => {
        return { value: header.key, label: header.label };
      }),
  );*/

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
  /***fonction pour reuperer l'article crée */
  const handleSubmitArticle = (newArticle?: DbArticle) => {
    if (!newArticle) {
      alert("Aucun article à ajouter");
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
  /***valeur par defaut dans le formulaire d'ajout d'article */
  let initialData: InitialDataType = {
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
  /***fonction pour selectionne un article à modifier et ouvrir le modal de modification */
  const handleEditArticle = async (item: ElementType) => {
    setSelectedArticle(item as Article);
    setEditArticle(true);
  };
  /***focntion pour supprimer un article */
  const handleDeleteArticle = async (item: ElementType) => {
    console.log("Deleting event:", item);
    setSelectedArticle(item as Article);
    setArticles(articles.filter((newItem) => newItem.id !== item.id));
    const res = await DeleteArticle(item.id as string);
    toast(
      res,
      false,
      res ? "Supprimé avec succès !" : "Echec de la suppresion",
    );
  };
  if (selectedArticle) {
    initialData = {
      title: (selectedArticle.title as string) || "",
      content: (selectedArticle.content as string) || "",
      createdAt: (selectedArticle.createdAt as string) || "",
      rubrique: (selectedArticle.rubrique as Rubriques) || "",
      une: (selectedArticle.une as boolean) || false,
      illustrationUrl: selectedArticle.illustrationUrl,
    };
  }
  /***fonction pour modifier un article déja crée */
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

      toast(true, false, "Article mis à jour !");
    } catch (error) {
      console.log("❌ Erreur:", error);
      toast(false, false, "Échec de l'upload de l'article");
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

  /*** Filtrer les articles */
  const filteredArticles = articles.filter((article) => {
    const search = inputValue.trim().toLowerCase();

    if (!search) return true;

    return (
      article.title?.toLowerCase().includes(search) ||
      article.rubrique?.toLowerCase().includes(search) ||
      article.content?.toLowerCase().includes(search)
      //article.createdAt?.includes(search)
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
          <h1 className={textClasses}>Gestion des Articles</h1>
          <h3 className={subTextClasses}>
            Gérer les articles depuis cette interface
          </h3>
        </div>
      </div>

      <div className={contentContainerClasses}>
        <div className={searchAndTabsClasses}>
          <div className={searchBarWrapperClasses}>
            <SearchBarComponent
              placeholder="Rechercher un article...."
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>
          {/*<Filter filters={filters} onFilterChange={setSelectedFilter} />*/}
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
              initialArticleData={initialData}
              fields={ArticleFields}
              onSuccess={handleSubmitArticle}
              //setter={setArticles}
            />
          </article>
        </article>
      </div>

      <AddElementModal
        isOpen={editArticle}
        onClose={() => setEditArticle(false)}
        onSubmit={handleSubmitEditArticle}
        titleComponent="Modifier un article"
        buttonTitle="Modifier"
        fields={articleUpdateFields}
        initialData={initialData}
        id={selectedArticle?.id}
      />
    </div>
  );
}
