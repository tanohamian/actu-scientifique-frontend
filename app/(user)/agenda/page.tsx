'use client'

import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import { FetchEvents } from '@/app/actions/EventsManager'
import LoadingComponent from '@/app/components/loadingComponent'

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    time: string;
    url?: string;
    description: string;
    status: "NOT_LIVE" | "LIVE";
    createdAt: string;
}

export default function AgendaPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [liveEvents, setLiveEvents] = useState<Event[]>([])
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
    const [formattedCalendarEvents, setFormattedCalendarEvents] = useState<any[]>([])

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const response = await FetchEvents()
                if (response) {
                    const data = response as Event[]
                    const now = new Date()

                    const lives = data.filter(e => e.status === "LIVE")
                    setLiveEvents(lives)

                    const upcoming = data.filter(e => {
                        const eventDate = new Date(e.date)
                        return e.status === "NOT_LIVE" && eventDate > now
                    })
                    setUpcomingEvents(upcoming)

                    const calendar = data.map(e => ({
                        id: e.id,
                        title: e.title,
                        start: e.date.split('T')[0],
                        backgroundColor: '#f97316',
                        borderColor: '#ea580c',
                        textColor: '#ffffff',
                        extendedProps: { ...e }
                    }))
                    setFormattedCalendarEvents(calendar)
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des événements:", error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return (
        <div className="min-h-screen p-6">
            <LoadingComponent
                isOpen={isLoading}
                onClose={() => setIsLoading(false)}
            />

            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <style jsx global>{`
                                .fc .fc-toolbar-title { font-size: 1.5rem; font-weight: bold; color: white; text-transform: uppercase; }
                                .fc .fc-toolbar { background: linear-gradient(to right, #475569, #334155); padding: 1.5rem; margin-bottom: 0; }
                                .fc .fc-button { background-color: transparent; border: none; color: white; font-weight: 600; }
                                .fc .fc-button:hover { background-color: rgba(255, 255, 255, 0.2); border-radius: 0.5rem; }
                                .fc .fc-col-header { background: linear-gradient(to right, #475569, #334155); }
                                .fc .fc-col-header-cell { color: white; padding: 0.75rem 0; text-transform: uppercase; font-size: 0.875rem; }
                                .fc .fc-day-today { background-color: #fed7aa !important; }
                                .fc .fc-event { border-radius: 0.375rem; padding: 0.25rem; cursor: pointer; border: none; }
                            `}</style>

                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                locale={frLocale}
                                events={formattedCalendarEvents}
                                height="auto"
                                headerToolbar={{ left: 'prev', center: 'title', right: 'next' }}
                                eventClick={(info) => {
                                    if (info.event.extendedProps.url) {
                                        window.open(info.event.extendedProps.url, "_blank")
                                    } else {
                                        alert(`${info.event.title}\nLieu: ${info.event.extendedProps.location}\nHeure: ${info.event.extendedProps.time}`)
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">

                        <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                                <h3 className="text-white text-xl font-bold text-center">En direct</h3>
                            </div>
                            <div className="p-6 bg-gray-100 min-h-[150px] space-y-4">
                                {liveEvents.length > 0 ? liveEvents.map(event => (
                                    <div key={event.id} className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-orange-500">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                            <span className="text-orange-500 font-bold text-xs">LIVE MAINTENANT</span>
                                        </div>
                                        <h4 className="font-bold text-slate-800">{event.title}</h4>
                                        <p className="text-slate-500 text-xs mt-1">📍 {event.location} - {event.time}</p>
                                        <a href={event.url} target="_blank" rel="noopener noreferrer"
                                            className="mt-3 block text-center text-xs bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                                            REJOINDRE LE DIRECT
                                        </a>
                                    </div>
                                )) : (
                                    <div className="flex flex-col items-center justify-center text-gray-400 py-8">
                                        <p className="text-sm italic">Aucun direct pour le moment</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-4 bg-slate-600 border-b border-slate-500">
                                <h3 className="text-white text-xl font-bold">À venir</h3>
                            </div>
                            <div className="p-4 bg-gray-100 space-y-3 min-h-[250px]">
                                {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                                    <div key={event.id} className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500 hover:scale-[1.02] transition-transform">
                                        <h4 className="font-bold text-slate-800 text-sm">{event.title}</h4>
                                        <div className="text-[11px] text-slate-500 mt-2 flex justify-between items-center">
                                            <span className="flex items-center gap-1">📅 {new Date(event.date).toLocaleDateString('fr-FR')}</span>
                                            <span className="flex items-center gap-1">⏰ {event.time}</span>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-center text-gray-400 text-sm italic py-10">Aucun événement prévu</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}