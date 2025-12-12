'use client'


import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import EventDataTable, { TableData } from '@/app/components/eventDataTable';
import React, { useState } from 'react'
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import { useRouter } from 'next/navigation';
import Calendar from '@/app/components/calendarCompenetWithFullCalendar';
import Filter, { IFilter } from '@/app/components/filter';
import { Media } from '../newsletters/components/Affichage';

const formatTimestampToDate = (timestamp: string): string => {
  const date = new Date(parseInt(timestamp, 10)); // Convertir la chaîne en nombre puis en objet Date
  
  // Utiliser Intl.DateTimeFormat pour un format Jours/Mois/Année (français)
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',

    hour : '2-digit',
    minute: '2-digit'
  }).format(date);
};

const now = Date.now().toString()

const mainEventData: TableData[] = [
    { title: 'IA dans le journalisme', lieu: 'Dakar', status: 'pas en direct', date: '14/10/2025', heure: '10:00' },
    { title: 'IA dans le journalisme', lieu: 'Bouaké', status: 'pas en direct', date: '14/10/2025', heure: '10:00' },
];


const MediaFields: FormFieldConfig[] = [
    { name: 'title', label: 'Titre du media', type: 'text', placeholder: 'Entrez le titre du media', required: true },
    { name: 'type', label: 'Type', type: 'select', options: [{ value: 'photo', label: 'Photo' }, { value: 'video', label: 'Vidéo' }, { value: 'podcast', label: 'Podcast' }], required: true },
    { name: 'category', label: 'Catégorie', type: 'select', options: [{ value: 'Technologie', label: 'Technologie' }, { value: 'Matériel', label: 'Matériel' }], required: true },
];

const mainHeaders = [
    { key: 'title', label: 'Titre', flexBasis: '38%' },
    { key: 'type', label: 'Type', flexBasis: '12%' },
    { key: 'category', label: 'Categorie', flexBasis: '15%' },
    { key: 'date', label: 'Date de publication', flexBasis: '20%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];


const TABS_INACTIVE_COLOR = '#5A8FAC'; 
const TABS_ACTIVE_COLOR = '#374151';

export default function EventPage() {
  const formattedDatedNow = formatTimestampToDate(now)
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<TableData | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [filters] = useState<IFilter[]>(mainHeaders.map((header, index)=>{
      return {value: header.key, label: header.label}
    }))
    const [medias] = useState<Media[]>([
      {
        id: 1,
        title: "L'Avenir du Développement Front-end",
        type: "Photo",
        category: "Technologie",
        date: formattedDatedNow, 
      },
      {
        id: 2,
        title: "Les Avantages Mécano-Quantiques des Puces M3",
        type: "Video",
        category: "Matériel"
      },
      {
        id: 3,
        title: "Le Design System : Un Investissement Essentiel",
        type: "Photo",
        category: "UX/UI Design"
      },
    ])
    const router = useRouter();
    
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
    
    const tabButtonBaseClasses = `
        py-2 
        px-5 
        border-none 
        cursor-pointer 
        text-sm 
        md:text-base 
        font-medium 
        transition-all 
        duration-200 
        bg-transparent 
        text-white 
        rounded-md 
        whitespace-nowrap
    `;

    const handleEvent = () => {
        setIsOpen(true);
    };

    const handleSubmitEvent = () => {
        setIsOpen(false);
    };

    let initialData = {
        title: '',
        lieu: '',
        date: '',
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

    if (selectedEvent) {
        initialData = {
            title: selectedEvent.title as string || '',
            lieu: selectedEvent.lieu as string || '',
            date: selectedEvent.date as string || '',
            heure: selectedEvent.heure as string || '',
            status: selectedEvent.status as string || '',
        };
    }

    const handleTabClick = (mode: 'list' | 'calendar') => {
        setViewMode(mode);
    };

    return (
        <div className={pageContainerClasses}>
            <div className={headerClasses}>
                <div>
                    <h1 className={textClasses}>Gestion des Médias</h1>
                    <h3 className={subTextClasses}>Gérer les posdcasts et les videos depuis cette interface</h3>
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

                {
                    viewMode === 'list' ? (
                        <>
                            <EventDataTable
                                tableTitle=""
                                data={medias}
                                columnHeaders={mainHeaders}
                                handleEditEvent={handleEditEvent}
                            />
                        </>
                    ) : (
                        <Calendar />
                    )
                }

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