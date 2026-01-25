'use client'


import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import EventDataTable, { ElementType, TableData } from '@/app/components/eventDataTable';
import React, { useEffect, useState } from 'react'
import AddElementModal, { FormFieldConfig, InitialDataType } from '@/app/components/addElement';

import Filter, { IFilter } from '@/app/components/filter';
import { DbMedia } from '../newsletters/components/Affichage';
import { Property } from "csstype"
import { DeleteMedia, FetchMedias, UpdateMedia } from '@/app/actions/MediasManager';
import { MediaRubriques } from '@/app/components/FormComponent';
import { Product } from '../../page';

const MediaFields: FormFieldConfig[] = [
    { name: 'title', label: 'Titre du media', type: 'text', placeholder: 'Entrez le titre du media', required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Entrez une description ...', required: false },
    { name : 'file', label : "Fichier", type : "file" , required : true} ,
    { name: 'rubrique', label: 'Catégorie', type: 'select', options: [{ value: MediaRubriques.TECHNOLOGY, label: 'Technologie' }, { value: MediaRubriques.ART, label: 'Art' }, {value: MediaRubriques.ONE_HEALTH, label : "Santé"}, {value: MediaRubriques.SCIENCE, label: "Science"}], required: true },
];

const mainHeaders = [
    { key: 'title', label: 'Titre', flexBasis: '15%' },
    { key: 'type', label: 'Type', flexBasis: '9%' },
    { key: 'rubrique', label: 'Rubrique', flexBasis: '15%', textAlign: "center" as Property.TextAlign },
    { key: 'url', label: 'URL', flexBasis: '29%', type: 'url' },
    { key: 'createdAt', label: 'Date de publication', flexBasis: '20%' },
    { key: 'actions', label: 'Actions', flexBasis: '12%' },
];

export default function MediaPage() {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editMedia, setEditMedia] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<ElementType | null>(null);
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

    };

    const handleSubmitMedia = async (data: Product | InitialDataType | DbMedia) => {
        try {
            console.log("📋 Données reçues:", data);

            data = data as InitialDataType;
            const media = new FormData();

            media.append('title', data.title as string);
            media.append('type', data.type as string);
            media.append('rubrique', data.rubrique as string);

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

            console.log("📤 Envoi vers /api/upload-media");

            // ✅ Utiliser l'API route au lieu de la server action
            const response = await fetch('/api/upload-media', {
                method: 'POST',
                body: media,
                // NE PAS mettre de Content-Type header, le navigateur le fera automatiquement
            });

            console.log("📨 Réponse reçue:", response.status);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erreur lors de l\'upload');
            }

            const result = await response.json();
            console.log("✅ Média uploadé:", result);

            // Ajouter le nouveau média à la liste
            setMedias(prev => ([...prev, result.file]));
            setIsOpen(false);

            alert('Média ajouté avec succès !');

        } catch (error) {
            console.error("❌ Erreur:", error);
            alert(`Erreur: ${(error as Error).message}`);
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

    const handleSubmitEditMedia = async (data: Product | InitialDataType | DbMedia) => {

        try {
            data = data as InitialDataType
            const media = new FormData()
            media.append('title', data["title"] as string)
            media.append('name', data["name"] as string)
            media.append('type', data["type"] as string)
            media.append('rubrique', data["rubrique"] as string)
            if (data["file"]) {
                media.append('file', data['file'] as File)
                console.log("file found !")
            }
            console.log(media)
            console.log(data)
            await UpdateMedia(media, selectedMedia?.id as string)

            setIsOpen(false);
        } catch (error) {
            console.log((error as Error).message)
        }
        setEditMedia(false);
    };

    if (selectedMedia) {
        initialData = {
            name: (selectedMedia as DbMedia).name as string || '',
            createdAt: (selectedMedia as DbMedia).createdAt as string || '',
            type: (selectedMedia as DbMedia).type,
            title: (selectedMedia as DbMedia).title
        };
    }

    useEffect(() => {
        const fetchMedias = async () => {
            try {
                const response = await FetchMedias() as DbMedia[]
                console.log({ response })
                if (response) {
                    setMedias(response.map(media => {
                        const createdAt = new Date(media.createdAt)
                        media.createdAt = createdAt.toLocaleString("fr")
                        console.log("createdAt de création : ", media.createdAt)
                        return media
                    }))
                }

            } catch (err) {
                console.log("erreur lors de la recuperations des utilisateurs : ", err)
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

            </div>

            <AddElementModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleSubmitMedia}
                titleComponent="Ajouter un Média"
                buttonTitle="Ajouter"
                fields={MediaFields}
                initialData={initialData}
            />

            <AddElementModal
                isOpen={editMedia}
                onClose={() => setEditMedia(false)}
                onSubmit={handleSubmitEditMedia}
                titleComponent="Modifier un média"
                buttonTitle="Modifier"
                fields={MediaFields}
                initialData={initialData}
            />
        </div>
    );
}