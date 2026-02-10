'use client'
import ButtonComponent from '@/app/components/button';
import SearchBarComponent from '@/app/components/searchBar';
import EventDataTable, { EventInterface, TableData } from '@/app/components/eventDataTable';
import React, { useEffect, useState } from 'react'
import AddElementModal, { FormFieldConfig, InitialDataType } from '@/app/components/addElement';
import { useRouter } from 'next/navigation';
import Calendar from '@/app/components/calendarCompenetWithFullCalendar';
import { CreateEvent, DeleteEvent, FetchEvents, UpdateEvent } from '@/app/actions/EventsManager';
import LoadingComponent from '@/app/components/loadingComponent'
import { toast } from '@/app/components/FormComponent';

const EventFields: FormFieldConfig[] = [
    { name: 'title', label: 'Titre de l\'évènement', type: 'text', placeholder: 'Entrez le titre de l\'évènement', required: true },
    { name: 'location', label: 'Lieu', type: 'text', placeholder: 'Entrez le lieu de l\'évènement', required: true },
    { name: 'date', label: 'Date', type: 'date', placeholder: 'Entrez la date de l\'évènement', required: true },
    { name: 'time', label: 'Heure', type: 'time', placeholder: 'Entrez l\'heure de l\'évènement', required: true },
    { name: "description", label: "Description", type: "description", placeholder: "Entrez la description de l\'évènement", required: false }
];

const EventFieldsLive: FormFieldConfig[] = [
    { name: 'title', label: 'Titre de l\'évènement', type: 'text', placeholder: 'Entrez le titre de l\'évènement', required: true },
    { name: 'url', label: 'Url', type: 'text', placeholder: 'Entrez l\'url de l\'évènement', required: true },
];

const mainHeaders = [
    { key: 'title', label: 'Titre de l\'evenement', flexBasis: '25%' },
    { key: 'location', label: 'lieu', flexBasis: '15%' },
    { key: 'date', label: 'Date', flexBasis: '15%' },
    { key: 'time', label: 'heure', flexBasis: '15%' },
    { key: 'actions', label: 'Actions', flexBasis: '15%' },
];

const liveHeaders = [
    { key: 'title', label: 'Titre de l\'evenement', flexBasis: '40%' },
    { key: 'url', label: 'Url', flexBasis: '30%' },
];

const TABS_INACTIVE_COLOR = '#5A8FAC';
const TABS_ACTIVE_COLOR = '#374151';

export interface EventLive {
    id?: string | undefined,
    title: string | undefined,
    url: string | undefined,
    status?: boolean
}


export default function EventPage() {
    const [allEvents, setAllEvents] = useState<EventInterface[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const [events, setEvents] = useState<EventInterface[]>([]);
    const [eventLive, setEventLive] = useState<EventLive[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<TableData | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [isLoading, setIsLoading] = useState(false);

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
    const handleSubmitEvent = async (data: EventInterface) => {
        try {
            const newEvent = await CreateEvent(data);

            if (newEvent) {
                setIsOpen(false);

                const formattedEvent = {
                    ...newEvent,
                    status: newEvent.status,
                    date: newEvent.date || ''
                };

                setEvents((prevEvents) => [...prevEvents, formattedEvent as EventInterface]);

                setAllEvents((prevAll) => [...prevAll, formattedEvent as EventInterface]);
                toast(true,false, "Évènement créé avec succès !");
            }
        } catch (error) {
            console.error("Erreur lors de la création de l'événement : ", error);
        }
    };

    const handleSubmitEditEvent = async (data: EventInterface) => {
        try {
            const eventId = selectedEvent?.id as string;
            
           if(!data?.url){
             throw new Error("L'URL est requise pour les événements en direct.");
           }


            const updatedEvent = await UpdateEvent(true, eventId, data.url || '');

            if (updatedEvent && !Array.isArray(updatedEvent)) {
                const formattedEvent = {
                    ...updatedEvent,
                    status: updatedEvent.status,
                    url: updatedEvent.url || '',
                };

                setAllEvents((prevAll) => {
                    const exists = prevAll.find(e => e.id === updatedEvent.id);
                    return exists
                        ? prevAll.map(e => e.id === updatedEvent.id ? formattedEvent as EventInterface : e)
                        : [...prevAll, formattedEvent as EventInterface];
                });

                if (updatedEvent.status === true) {
                    setEventLive((prevLive) => {
                        const exists = prevLive.find(e => e.id === updatedEvent.id);
                        return exists
                            ? prevLive.map(e => e.id === updatedEvent.id ? formattedEvent as EventLive : e)
                            : [...prevLive, formattedEvent as EventLive];
                    });

                    setEvents((prevEvents) => prevEvents.filter(e => e.id !== updatedEvent.id));

                } else {
                    setEvents((prevEvents) => {
                        const exists = prevEvents.find(e => e.id === updatedEvent.id);
                        return exists
                            ? prevEvents.map(e => e.id === updatedEvent.id ? formattedEvent as EventInterface : e)
                            : [...prevEvents, formattedEvent as EventInterface];
                    });

                    setEventLive((prevLive) => prevLive.filter(e => e.id !== updatedEvent.id));
                }

                setEditEvent(false);
                setSelectedEvent(null);
                toast(true,false, "Évènement mis à jour avec succès !");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'événement : ", error);
        }
    };

    let initialData: InitialDataType = {
        title: '',
        location: '',
        date: '',
        time: '',
        status: false,
    };
    let initialDataLive: InitialDataType = {
        title: '',
        url: '',
        status: false,
    };

    const handleEditEvent = (item: TableData) => {
        setSelectedEvent(item);
        setEditEvent(true);
    };



    if (selectedEvent) {
        initialData = {
            title: selectedEvent.title as string || '',
            location: selectedEvent.location as string || '',
            date: selectedEvent.date as string || '',
            time: selectedEvent.time as string || '',
            status: selectedEvent.status || false,
        };
    }

    if (selectedEvent) {
        initialDataLive = {
            title: selectedEvent.title as string || '',
            url: selectedEvent.url as string || '',
            status: selectedEvent.status || false,
        };
    }

    const handleTabClick = (mode: 'list' | 'calendar') => {
        setViewMode(mode);
    };

    const handleDeleteEvent = async (data: TableData) => {
        try {
            const deletedEvent = await DeleteEvent(data?.id as string);
            if (deletedEvent) {
                setEvents((prevEvents) => prevEvents.filter(event => event.id !== data.id));
                setEventLive((prevLive) => prevLive.filter(event => event.id !== data.id));
                setAllEvents((prevAll) => prevAll.filter(event => event.id !== data.id));
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de l'événement : ", error);
        }
    };

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const events = await FetchEvents()
            if (events) {
                const liveEvents = events
                    .filter(event => event.status)
                    .map(event => ({
                        id: event.id,
                        title: event.title,
                        url: event.url,
                        status: true
                    }))

                const regularEvents = events
                    .filter(event => !event.status)
                    .map(event => ({
                        ...event,
                        status: event.status
                    }))

                const allFormattedEvents = events.map(event => ({
                    ...event,
                    status: event.status
                }))

                setAllEvents(allFormattedEvents)
                setEventLive(liveEvents)
                setEvents(regularEvents)
            }
            setIsLoading(false)
        })()
    }, [])

    const filteredEvents = events.filter(event =>
        event && (event?.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
            event?.location?.toLowerCase().includes(inputValue.toLowerCase()) ||
            event?.time?.toLowerCase().includes(inputValue.toLowerCase()) ||
            event?.status
        )
    )

    const filteredLiveEvents = eventLive.filter(event =>
        event && (event?.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
            event?.url?.toLowerCase().includes(inputValue.toLowerCase()) ||
            event?.status
        )
    )

    return (
        <div className={pageContainerClasses}>
            <LoadingComponent
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />
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
                                data={filteredEvents}
                                columnHeaders={mainHeaders}
                                handleEditEvent={handleEditEvent}
                                handleDeleteEvent={handleDeleteEvent}
                            />

                            <EventDataTable
                                tableTitle="Evènements en direct"
                                data={filteredLiveEvents}
                                columnHeaders={liveHeaders}
                                handleDeleteEvent={handleDeleteEvent}
                            />

                        </>
                    ) : (
                        <Calendar events={allEvents} />
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
                fields={EventFieldsLive}
                initialData={initialDataLive}
            />
        </div>
    );
}