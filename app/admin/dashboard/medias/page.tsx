'use client'


import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import EventDataTable, { ElementType, TableData } from '@/app/components/eventDataTable';
import React, { useEffect, useState } from 'react'
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';

import Filter, { IFilter } from '@/app/components/filter';
import { DbMedia, Media } from '../newsletters/components/Affichage';

import { AddMedia, DeleteMedia, FetchMedias } from '@/app/actions/MediasManager';
import { Rubriques } from '@/app/components/FormComponent';

const MediaFields: FormFieldConfig[] = [
    { name: 'title', label: 'Titre du media', type: 'text', placeholder: 'Entrez le titre du media', required: true },
    { name: 'type', label: 'Type', type: 'select', options: [{ value: 'photo', label: 'Photo' }, { value: 'video', label: 'Vidéo' }, { value: 'podcast', label: 'Podcast' }], required: true },
    { name : 'file', label : "Fichier", type : "file" , required : true} ,
    { name: 'rubrique', label: 'Catégorie', type: 'select', options: [{ value: Rubriques.TECHNOLOGY, label: 'Technologie' }, { value: 'Matériel', label: 'Matériel' }], required: true },
];

const mainHeaders = [
    { key: 'title', label: 'Titre', flexBasis: '38%' },
    { key: 'type', label: 'Type', flexBasis: '12%' },
    { key: 'rubrique', label: 'Categorie', flexBasis: '15%' },
    { key: 'createdAt', label: 'Date de publication', flexBasis: '20%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];

export default function MediaPage() {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editMedia, setEditMedia] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<ElementType | null>(null);
    const [filters] = useState<IFilter[]>(mainHeaders.map((header)=>{
      return {value: header.key, label: header.label}
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

    let initialData : { [key: string]: string| File | undefined; }= {
        name: '',
        createdAt: '',
        title: "",
        type : "",
        file: undefined,

    };

    const handleSubmitMedia = async() => {
        const media = new FormData()
        media.append('title', initialData.title as string)
        media.append('name', initialData.name as string)
        media.append('type', initialData.type as string)
        if (initialData.file) {
            media.append('file', initialData.file)
        }

        await AddMedia(media)
        setIsOpen(false);
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

    const handleSubmitEditMedia = () => {
        setEditMedia(false);
    };

    if (selectedMedia) {
        initialData = {
            name: (selectedMedia as Media).name as string || '',
            createdAt: (selectedMedia as Media).createdAt as string || '',
            type : (selectedMedia as Media).type,
            title: (selectedMedia as Media).title
        };
    }

        useEffect(() => {
            const fetchMedias = async () => {
                try {
                    const response = await FetchMedias() as DbMedia[]
                    console.log({response})
                    if (response) {
                        setMedias(response.map(media =>{
                            const createdAt  = new Date(media.createdAt)
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
                        data={medias as Media[]}
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