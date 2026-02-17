'use client'


import ButtonComponent from '@app/components/button';
import SearchBarComponent from '@app/components/searchBar';
import EventDataTable, { ElementType, TableData } from '@app/components/eventDataTable';
import { useEffect, useState } from 'react'
import AddElementModal, { FormFieldConfig, InitialDataType } from '@app/components/addElement';

import Filter, { IFilter } from '@app/components/filter';
import { Property } from "csstype"
import { DeleteMedia, FetchMedias, UpdateMedia } from '@app/actions/MediasManager';
import { Rubriques } from '@app/enum/enums';
import { toast } from '@app/components/FormComponent';
import LoadingComponent from '@app/components/loadingComponent';
import { DbMedia, Product } from '@app/interfaces';

const MediaFields: FormFieldConfig[] = [
    { name: 'title', label: 'Titre du media', placeholder: 'Entrez le titre du media', required: true },
    { name: 'description', label: 'Description', type: 'description', placeholder: 'Entrez une description ...', required: false },
    { name: 'file', label: "Fichier", type: "file" },
    {
        name: 'rubrique', label: 'Rubrique', type: 'select',
        options: [
            { label: "Une seule santé", value: Rubriques.ONE_HEALTH },
            { label: 'Technologie', value: Rubriques.TECHNOLOGY },
            { label: 'Éco-humanité', value: Rubriques.ECO_HUMANITY },
            { label: 'Portrait et découvertes', value: Rubriques.PORT_DISCOVERY },
        ],
        required: true
    },
    {
        name: 'une', label: 'Mettre à la une', type: "select", options: [
            { label: "Oui", value: 1 },
            { label: "Non", value: 0 }
        ]
    }
];

const updateMediaFields: FormFieldConfig[] = [
    { name: 'title', label: 'Titre du media', placeholder: 'Entrez le titre du media' },
    { name: 'description', label: 'Description', type: 'description', placeholder: 'Entrez une description ...' },
    { name: 'file', label: "Fichier", type: "file" },
    {
        name: 'rubrique', label: 'Rubrique', type: 'select',
        options: [
            { label: "Une seule santé", value: Rubriques.ONE_HEALTH },
            { label: 'Technologie', value: Rubriques.TECHNOLOGY },
            { label: 'Éco-humanité', value: Rubriques.ECO_HUMANITY },
            { label: 'Portrait et découvertes', value: Rubriques.PORT_DISCOVERY },
        ],
    },
    {
        name: 'une', label: 'Mettre à la une', type: "select", options: [
            { label: "Oui", value: 1 },
            { label: "Non", value: 0 }
        ]
    }
];
const mainHeaders = [
    { key: 'title', label: 'Titre', flexBasis: '15%' },
    { key: 'type', label: 'Type', flexBasis: '9%' },
    { key: 'rubrique', label: 'Rubrique', flexBasis: '15%', textAlign: "center" as Property.TextAlign },
    { key: 'url', label: 'URL', flexBasis: '29%', type: 'url' },
    { key: 'createdAt', label: 'Date de publication', flexBasis: '20%' },
    { key: 'actions', label: 'Actions', flexBasis: '12%' },
];
export type rubriques = "technology" | "one_health" | "ecohumanity"

export default function MediaPage() {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [editMedia, setEditMedia] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<ElementType | null>(null);
    const [loadingAddMeddia, setLoadingAddMedia] = useState(false);
    const [loadingEditMedia, setLoadingEditMedia] = useState(false);

    const [filters] = useState<IFilter[]>(mainHeaders.map((header) => {
        return { value: header.key, label: header.label }
    }))
    const [medias, setMedias] = useState<DbMedia[]>([])
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
        setIsOpen(true);
    };

    let initialData: InitialDataType = {
        name: '',
        createdAt: '',
        title: "",
        type: "",
        file: undefined,
        description: "",
        rubrique: "",
    };

    const handleSubmitMedia = async (data: Product | InitialDataType | DbMedia) => {
        setLoadingAddMedia(true)
        try {
            console.log("📋 Données reçues:", data);

            data = data as InitialDataType;
            const media = new FormData();

            media.append('title', data.title as string);
            media.append('rubrique', data.rubrique as rubriques);
            media.append('une', data.une as string);
            media.append('description', data.description as string);

            if (data.file instanceof File) {
                media.append('file', data.file);
                console.log("✅ Fichier ajouté:", data.file.name, data.file.size);
            } else {
                throw new Error("Aucun fichier sélectionné");
            }

            console.log("📦 Contenu du FormData:");
            for (const [key, value] of media.entries()) {
                if (value instanceof File) {
                    console.log(`  ${key}: [File] ${value.name} (${value.size} bytes)`);
                } else {
                    console.log(`  ${key}:`, value);
                }
            }


            const response = await fetch('/api/upload-media', {
                method: 'POST',
                body: media,
            });

            console.log("📨 Réponse reçue:", response.status);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erreur lors de l\'upload');
            }

            const result = await response.json();
            console.log("✅ Média uploadé:", result);


            setMedias(prev => ([...prev, result.file]));
            setIsOpen(false);

            toast(true, false, "Media uploadé !");

        } catch (error) {
            console.error("❌ Erreur:", error);
            toast(false, false, "Échec de l'upload du media");
        } finally {
            setLoadingAddMedia(false)
        }
    };

    
    const handleEditMedia = async (item: ElementType) => {
        console.log('Editing event:', item);
        setSelectedMedia(item as TableData);
        setEditMedia(true);
    };

    const handleDeleteMedia = async (item: ElementType) => {
        console.log('Deleting event:', item);
        setSelectedMedia(item as TableData);
        await DeleteMedia(item.id as string)
        setMedias(medias.filter((media) => media.id !== item.id))

    };



    if (selectedMedia) {
        const media = selectedMedia as DbMedia;
        initialData = {
            name: media.name as string || '',
            createdAt: media.createdAt as string || '',
            type: media.type as string,
            title: media.title as string,
            description: media.description as string || '',
            rubrique: media.rubrique as string || '',
            une: media.une ? 1 : 0,
        };
    }

    const handleSubmitEditMedia = async (data: Product | InitialDataType | DbMedia) => {
        setLoadingEditMedia(true)
        try {
            data = data as InitialDataType
            const media = new FormData()
            media.append('id', selectedMedia?.id as string)
            media.append('title', data.title as string)
            media.append('rubrique', data.rubrique as string)
            media.append('une', data.une as string)
            media.append('description', data.description as string)
            if (data.file && data.file instanceof File) {
                media.append('file', data.file)
                console.log("file found !")
            }
            const response = await fetch('/api/upload-media', {
                method: 'PUT',
                body: media,
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erreur lors de l\'upload');
            }
            const updatedMedia = await response.json();
            setMedias(prev => prev.map(m => m.id === updatedMedia.id ? updatedMedia : m));
            toast(true, false, "Média mis à jour !");
            setEditMedia(false);
        } catch (error) {
            console.log((error as Error).message)
            toast(false, false, "Échec de la mise à jour du média");
        }finally {
            setLoadingEditMedia(false)
        }

    };

    useEffect(() => {
        const fetchMedias = async () => {
            try {
                const response = await FetchMedias() as DbMedia[]
                console.log({ response })
                if (response) {
                    setMedias(response.map(media => {
                        const createdAt = new Date(media.createdAt)
                        media.createdAt = createdAt.toLocaleString("fr")
                        return media
                    }))
                }

            } catch (err) {
                console.log("erreur lors de la recuperations des utilisateurs : ", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMedias()
    }, [])

    

    return (
        <div className={pageContainerClasses}>
            <div className={headerClasses}>
                <div>
                    <h1 className={textClasses}>Gestion des Médias</h1>
                    <h3 className={subTextClasses}>Gérer les podcasts et les videos depuis cette interface</h3>
                </div>
                <ButtonComponent textButton='Ajouter un media' size='large' onclick={handleMedia} />
            </div>

            <div className={contentContainerClasses}>

                <div className={searchAndTabsClasses}>
                    <div className={searchBarWrapperClasses}>
                        <SearchBarComponent placeholder='Rechercher un media....' inputValue={inputValue} setInputValue={setInputValue} />
                    </div>
                    <Filter
                        filters={filters}
                    />
                </div>

                <article className="flex flex-col lg:flex-row gap-8" >

                    <EventDataTable
                        tableTitle=""
                        isMedia={true}
                        data={medias as DbMedia[]}
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
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleSubmitMedia}
                titleComponent="Ajouter un Média"
                buttonTitle="Ajouter"
                fields={MediaFields}
                initialData={initialData}
                isLoading={loadingAddMeddia}
            />

            <AddElementModal
                isOpen={editMedia}
                onClose={() => setEditMedia(false)}
                onSubmit={handleSubmitEditMedia}
                titleComponent="Modifier un média"
                buttonTitle="Modifier"
                fields={updateMediaFields}
                initialData={initialData}
                isLoading={loadingEditMedia}
            />
        </div>
    );
}