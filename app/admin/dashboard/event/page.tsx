'use client'
import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import EventDataTable, { TableData } from '@/app/components/eventDataTable';
import React, { useState } from 'react'
import AddElementModal, { FormFieldConfig } from '@/app/components/addElement';
import { useRouter } from 'next/navigation';
import Calendar from '@/app/components/calendarCompenetWithFullCalendar';

const now = new Date()
const mainEventData: TableData[] = [
    { title: 'IA dans le journalisme', lieu: 'Dakar', status: 'pas en direct', createdAt: now },
    { title: 'IA dans le journalisme', lieu: 'Bouaké', status: 'pas en direct', createdAt: now },
];


const EventFields: FormFieldConfig[] = [
    { name: 'title', label: 'Titre de l\'évènement', type: 'text', placeholder: 'Entrez le titre de l\'évènement', required: true },
    { name: 'lieu', label: 'Lieu', type: 'text', placeholder: 'Entrez le lieu de l\'évènement', required: true },
    { name: 'date', label: 'Date', type: 'text', placeholder: 'Entrez la date de l\'évènement', required: true },
    { name: 'heure', label: 'Heure', type: 'text', placeholder: 'Entrez l\'heure de l\'évènement', required: true },
    { name: 'status', label: 'Statut', type: 'select', options: [{ value: 'live', label: 'En direct' }, { value: 'not_live', label: 'Pas en direct' }], required: true },
];

const mainHeaders = [
    { key: 'title', label: 'Titre de l\'evenement', flexBasis: '25%' },
    { key: 'lieu', label: 'lieu', flexBasis: '15%' },
    { key: 'status', label: 'Statut', flexBasis: '15%' },
    { key: 'date', label: 'Date', flexBasis: '15%' },
    { key: 'heure', label: 'heure', flexBasis: '15%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];

const liveEventData: TableData[] = [
    { title: 'IA dans le journalisme', status: 'en direct', url: 'https://ghhddd.com', createdAt: now },
    { title: 'IA dans le journalisme', status: 'en direct', url: 'https://vubu.com', createdAt: now },
];

const liveHeaders = [
    { key: 'title', label: 'Titre de l\'evenement', flexBasis: '40%' },
    { key: 'status', label: 'Statut', flexBasis: '30%' },
    { key: 'url', label: 'Url', flexBasis: '30%' },
];

const TABS_INACTIVE_COLOR = '#5A8FAC'; 
const TABS_ACTIVE_COLOR = '#374151';

export default function EventPage() {

    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<TableData | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

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
                    <h1 className={textClasses}>Gestion des Évènements</h1>
                    <h3 className={subTextClasses}>Ajouter, modifier et supprimer des évènements</h3>
                </div>
                <ButtonComponent textButton='Ajouter un évènement' size='large' onclick={handleEvent} />
            </div>

            <div className={contentContainerClasses}>

                <div className={searchAndTabsClasses}>
                    <div className={searchBarWrapperClasses}>
                        <SearchBarComponent placeholder='Rechercher un évènement....' inputValue={inputValue} setInputValue={setInputValue} />
                    </div>

                    <div className={tabsClasses}>
                        <button 
                            className={`${tabButtonBaseClasses} ${viewMode === 'list' ? `bg-[${TABS_ACTIVE_COLOR.replace('#', '')}] shadow-md text-white` : 'bg-transparent text-white/90 hover:bg-white/10'}`}
                            onClick={() => { handleTabClick('list'); router.push('/admin/dashboard/event'); }}
                        >
                            Liste
                        </button>

                        <button 
                            className={`${tabButtonBaseClasses} ${viewMode === 'calendar' ? `bg-[${TABS_ACTIVE_COLOR.replace('#', '')}] shadow-md text-white` : 'bg-transparent text-white/90 hover:bg-white/10'}`}
                            onClick={() => handleTabClick('calendar')}
                        >
                            Calendrier
                        </button>
                    </div>
                </div>

                {
                    viewMode === 'list' ? (
                        <>
                            <EventDataTable
                                tableTitle=""
                                data={mainEventData}
                                columnHeaders={mainHeaders}
                                handleEditEvent={handleEditEvent}
                            />

                            <EventDataTable
                                tableTitle="Evènements en direct"
                                data={liveEventData}
                                columnHeaders={liveHeaders}
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
                titleComponent="Ajouter un évènement"
                buttonTitle="Ajouter"
                fields={EventFields}
                initialData={initialData}
            />

            <AddElementModal
                isOpen={editEvent}
                onClose={() => setEditEvent(false)}
                onSubmit={handleSubmitEditEvent}
                titleComponent="Modifier un évènement"
                buttonTitle="Modifier"
                fields={EventFields}
                initialData={initialData}
            />
        </div>
    );
}