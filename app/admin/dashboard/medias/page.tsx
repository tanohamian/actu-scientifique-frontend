'use client'


import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import EventDataTable, { TableData } from '@/app/components/eventDataTable';
import React, { useEffect, useState } from 'react'
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import { useRouter } from 'next/navigation';
import Calendar from '@/app/components/calendarCompenetWithFullCalendar';
import Filter, { IFilter } from '@/app/components/filter';
import { DbMedia, Media, MimeTypes } from '../newsletters/components/Affichage';
import AddMedia from '@/app/actions/addMedia';
import FetchMedias from '@/app/actions/fetchMedias';
import ComponenteFormulaire, { Rubriques } from '../newsletters/components/ComponenteFormulaire';

const formatTimestampToDate = (timestamp: string): string => {
  const createdAt = new Date(parseInt(timestamp, 10)); // Convertir la chaîne en nombre puis en objet Date
  
  // Utiliser Intl.DateTimeFormat pour un format Jours/Mois/Année (français)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',

    hour : '2-digit',
    minute: '2-digit'
  }).format(createdAt);
};

const now = Date.now().toString()


const MediaFields: FormFieldConfig[] = [
    { name: 'title', label: 'Titre du media', type: 'text', placeholder: 'Entrez le titre du media', required: true },
    { name: 'type', label: 'Type', type: 'select', options: [{ value: 'photo', label: 'Photo' }, { value: 'video', label: 'Vidéo' }, { value: 'podcast', label: 'Podcast' }], required: true },
    { name: 'rubrique', label: 'Catégorie', type: 'select', options: [{ value: Rubriques.TECHNOLOGY, label: 'Technologie' }, { value: 'Matériel', label: 'Matériel' }], required: true },
];

const mainHeaders = [
    { key: 'title', label: 'Titre', flexBasis: '38%' },
    { key: 'type', label: 'Type', flexBasis: '12%' },
    { key: 'rubrique', label: 'Categorie', flexBasis: '15%' },
    { key: 'createdAt', label: 'Date de publication', flexBasis: '20%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];


const TABS_INACTIVE_COLOR = '#5A8FAC'; 
const TABS_ACTIVE_COLOR = '#374151';

export default function EventPage() {
  const formattedDatedNow = formatTimestampToDate(now)
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const [selectedMedia, setSelectedEvent] = useState<TableData | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [filters] = useState<IFilter[]>(mainHeaders.map((header, index)=>{
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

    const tabsClasses = `
        flex 
        gap-0 
        bg-[${TABS_INACTIVE_COLOR.replace('#', '')}] 
        rounded-lg 
        overflow-hidden 
        p-1
    `;


    const rightSectionClasses = `
        w-full 
        lg:w-1/3 
        h-fit 
        ml-auto
        flex-shrink-0 
        mt-8 
        lg:mt-0 
    `;

    const handleEvent = () => {
        setIsOpen(true);
    };

    const handleSubmitEvent = () => {
        setIsOpen(false);
    };

    let initialData = {
        name: '',
        lieu: '',
        createdAt: '',
        heure: '',
        status: '',
    };

    const handleEditEvent = (item: TableData) => {
        console.log('Editing event:', item);
        setSelectedEvent(item);
        setEditEvent(true);
    };

    const handleSubmitEditEvent = () => {
        setEditEvent(false);
    };

    if (selectedMedia) {
        initialData = {
            name: selectedMedia.name as string || '',
            lieu: selectedMedia.lieu as string || '',
            createdAt: selectedMedia.createdAt as string || '',
            heure: selectedMedia.heure as string || '',
            status: selectedMedia.status as string || '',
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
                <ButtonComponent textButton='Ajouter un media' size='large' onclick={handleEvent} />
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
                    data={medias}
                    columnHeaders={mainHeaders}
                    handleEditEvent={handleEditEvent}
                />

                <article className={rightSectionClasses}>
                <ComponenteFormulaire isMedia={true} setMedias={setMedias}/>
                </article>
            </article>

            </div>

            <AddElementModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={handleSubmitEvent}
                titleComponent="Ajouter un Média"
                buttonTitle="Ajouter"
                fields={MediaFields}
                initialData={initialData}
            />

            <AddElementModal
                isOpen={editEvent}
                onClose={() => setEditEvent(false)}
                onSubmit={handleSubmitEditEvent}
                titleComponent="Modifier un média"
                buttonTitle="Modifier"
                fields={MediaFields}
                initialData={initialData}
            />
        </div>
    );
}