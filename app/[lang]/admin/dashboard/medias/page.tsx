"use client";

import ButtonComponent from "@app/components/button";
import SearchBarComponent from "@app/components/searchBar";
import EventDataTable, {
  ElementType,
  TableData,
} from "@app/components/eventDataTable";
import { useEffect, useState, useMemo } from "react";
import AddElementModal, {
  FormFieldConfig,
  InitialDataType,
} from "@app/components/addElement";
import Filter, { IFilter } from "@app/components/filter";
import { Property } from "csstype";
import {
  AddMedia,
  DeleteMedia,
  FetchMedias,
  UpdateMedia,
} from "@actions/MediasManager";
import { Rubriques } from "@enum/enums";
import { toast } from "@components/FormComponent";
import LoadingComponent from "@components/loadingComponent";
import { DbMedia, Product } from "@interfaces/index";
import ConfirmModal from "@app/components/ConfirmModal";
import { useTranslations } from "next-intl";

export type rubriques = "technology" | "one_health" | "ecohumanity";

export default function MediaPage() {
  const t = useTranslations("MediaPage");

  const mediaFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "title",
        label: t("fields.title"),
        placeholder: t("fields.titlePlaceholder"),
        required: true,
      },
      {
        name: "description",
        label: t("fields.description"),
        type: "description",
        placeholder: t("fields.descriptionPlaceholder"),
        required: false,
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
        name: "type",
        label: t("fields.type"),
        type: "select",
        options: [
          { label: t("fields.typeOptions.url"), value: "url" },
          { label: t("fields.typeOptions.file"), value: "file" },
        ],
        required: true,
      },
      {
        name: "url",
        label: t("fields.url"),
        type: "url",
        placeholder: t("fields.urlPlaceholder"),
        conditionalField: { dependsOn: "type", showWhen: "url" },
      },
      {
        name: "file",
        label: t("fields.file"),
        type: "file",
        conditionalField: { dependsOn: "type", showWhen: "file" },
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

  const updateMediaFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "title",
        label: t("fields.title"),
        placeholder: t("fields.titlePlaceholder"),
      },
      {
        name: "description",
        label: t("fields.description"),
        type: "description",
        placeholder: t("fields.descriptionPlaceholder"),
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
        name: "type",
        label: t("fields.type"),
        type: "select",
        options: [
          { label: t("fields.typeOptions.url"), value: "url" },
          { label: t("fields.typeOptions.fileEdit"), value: "file" },
        ],
      },
      {
        name: "url",
        label: t("fields.url"),
        type: "url",
        placeholder: t("fields.urlPlaceholder"),
        conditionalField: { dependsOn: "type", showWhen: "url" },
      },
      {
        name: "file",
        label: t("fields.file"),
        type: "file",
        conditionalField: { dependsOn: "type", showWhen: "file" },
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
      { key: "title", label: t("headers.title"), flexBasis: "15%" },
      { key: "type", label: t("headers.type"), flexBasis: "9%" },
      {
        key: "rubrique",
        label: t("headers.rubrique"),
        flexBasis: "15%",
        textAlign: "center" as Property.TextAlign,
      },
      { key: "url", label: t("headers.url"), flexBasis: "29%", type: "url" },
      { key: "createdAt", label: t("headers.publishedAt"), flexBasis: "20%" },
      { key: "actions", label: t("headers.actions"), flexBasis: "12%" },
    ],
    [t],
  );

  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editMedia, setEditMedia] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<ElementType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<ElementType | null>(null);
  const [loadingAddMeddia, setLoadingAddMedia] = useState(false);
  const [loadingEditMedia, setLoadingEditMedia] = useState(false);

  const [medias, setMedias] = useState<DbMedia[]>([]);

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

  const handleMedia = () => {
    setSelectedMedia(null);
    setIsOpen(true);
  };

  const emptyData: InitialDataType = {
    name: "",
    createdAt: "",
    title: "",
    type: "",
    file: undefined,
    description: "",
    rubrique: "",
    url: "",
  };

  const handleSubmitMedia = async (
    data: Product | InitialDataType | DbMedia,
  ) => {
    setLoadingAddMedia(true);
    try {
      data = data as InitialDataType;
      const media = new FormData();

      media.append("title", data.title as string);
      media.append("rubrique", data.rubrique as rubriques);
      media.append("une", data.une as string);
      media.append("description", data.description as string);

      if (data.type === "file") {
        if (data.file instanceof File) {
          media.append("file", data.file);
          console.log("✅ Fichier ajouté:", data.file.name, data.file.size);
        } else {
          throw new Error("Aucun fichier sélectionné");
        }
      } else if (data.type === "url") {
        if (data?.url) {
          media.append("url", data?.url as string);
          console.log("✅ URL ajoutée:", data.url);
        } else {
          throw new Error("Aucune URL fournie");
        }
      }

      const result = await AddMedia(media);
      setMedias((prev) => [...prev, result]);
      setIsOpen(false);
      setSelectedMedia(null);
      toast(true, false, t("toasts.addSuccess"));
    } catch (error) {
      console.error("Erreur:", error);
      toast(false, false, t("toasts.addError"));
    } finally {
      setLoadingAddMedia(false);
    }
  };

  const handleEditMedia = async (item: ElementType) => {
    console.log("Editing event:", item);
    setSelectedMedia(item as TableData);
    setEditMedia(true);
  };

  const handleDeleteMedia = async (item: ElementType) => {
    console.log("Deleting event:", item);
    setMediaToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const editInitialData: InitialDataType | null = selectedMedia
    ? (() => {
        const media = selectedMedia as DbMedia;

        let formType = media.type;
        if (
          media.type === "video" ||
          media.type === "podcast" ||
          media.type === "fichier"
        ) {
          formType = media.url?.includes("http") ? "url" : "file";
        }

        return {
          name: media.name ?? "",
          createdAt:
            media.createdAt instanceof Date
              ? media.createdAt.toISOString()
              : (media.createdAt ?? ""),
          type: formType,
          title: media.title,
          description: media.description ?? "",
          rubrique: media.rubrique ?? "",
          une: media.une ? 1 : 0,
          url: media.url ?? "",
          mimeType: media.mimeType ?? "",
        };
      })()
    : null;

  const handleSubmitEditMedia = async (
    data: Product | InitialDataType | DbMedia,
  ) => {
    setLoadingEditMedia(true);
    try {
      data = data as InitialDataType;
      const media = new FormData();
      media.append("title", data.title as string);
      media.append("rubrique", data.rubrique as string);
      media.append("une", data.une as string);
      media.append("description", data.description as string);

      if (data.type === "file" && data.file && data.file instanceof File) {
        media.append("file", data.file);
        console.log("✅ Fichier trouvé et ajouté!");
      } else if (data.type === "url" && data.url) {
        media.append("url", data.url as string);
        console.log("✅ URL trouvée et ajoutée!");
      }

      const response = await UpdateMedia(media, selectedMedia?.id as string);
      setMedias((prev) =>
        prev.map((m) => (m.id === response.id ? response : m)),
      );
      toast(true, false, t("toasts.updateSuccess"));
      setEditMedia(false);
      setSelectedMedia(null);
    } catch (error) {
      console.log((error as Error).message);
      toast(false, false, t("toasts.updateError"));
    } finally {
      setLoadingEditMedia(false);
    }
  };

  const confirmDeleteMedia = async () => {
    if (!mediaToDelete) return;
    setIsDeleteModalOpen(false);
    const success = await DeleteMedia(mediaToDelete.id as string);
    if (success) {
      setMedias(medias.filter((media) => media.id !== mediaToDelete.id));
      toast(true, false, t("toasts.deleteSuccess"));
    } else {
      toast(false, false, t("toasts.deleteError"));
    }
    setMediaToDelete(null);
  };

  useEffect(() => {
    const fetchMedias = async () => {
      try {
        const response = (await FetchMedias()) as DbMedia[];
        console.log({ response });
        if (response) {
          setMedias(
            response.map((media) => {
              const createdAt = new Date(media.createdAt);
              media.createdAt = createdAt.toLocaleString("fr");
              return media;
            }),
          );
        }
      } catch (err) {
        console.log("erreur lors de la recuperations des utilisateurs : ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedias();
  }, []);

  const filteredMedias = medias.filter((media) => {
    const search = inputValue.trim().toLowerCase();

    if (!search) return true;

    return (
      media.title?.toLowerCase().includes(search) ||
      media.rubrique?.toLowerCase().includes(search) ||
      media.description?.toLowerCase().includes(search)
    );
  });

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
          onclick={handleMedia}
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
        </div>

        <article className="flex flex-col lg:flex-row gap-8">
          <EventDataTable
            tableTitle=""
            isMedia={true}
            data={filteredMedias as DbMedia[]}
            columnHeaders={mainHeaders}
            handleEditEvent={handleEditMedia}
            handleDeleteEvent={handleDeleteMedia}
          />
        </article>
        <LoadingComponent
          isOpen={isLoading}
          onClose={() => setIsLoading(false)}
        />
      </div>

      <AddElementModal
        key={isOpen ? "new-media-open" : "new-media-closed"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmitMedia}
        titleComponent={t("modals.addTitle")}
        buttonTitle={t("modals.addSubmit")}
        fields={mediaFields}
        initialData={emptyData}
        isLoading={loadingAddMeddia}
      />

      <AddElementModal
        isOpen={editMedia}
        key={selectedMedia?.id ?? "edit-media"}
        onClose={() => setEditMedia(false)}
        onSubmit={handleSubmitEditMedia}
        titleComponent={t("modals.editTitle")}
        buttonTitle={t("modals.editSubmit")}
        fields={updateMediaFields}
        initialData={editInitialData ?? emptyData}
        isLoading={loadingEditMedia}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteMedia}
        title={t("modals.deleteTitle")}
      />
    </div>
  );
}
