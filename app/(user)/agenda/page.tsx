'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'

export default function AgendaPage() {

    const liveEvent = {
        title: "Conférence sur l'IA",
        time: "14:30 - 16:00",
        location: "Salle A"
    }

    const upcomingEvents = [
        {
            id: 1,
            title: "Réunion d'équipe",
            date: "15 Oct 2024",
            time: "09:00",
            color: "bg-blue-500"
        },
        {
            id: 2,
            title: "Présentation projet",
            date: "18 Oct 2024",
            time: "14:00",
            color: "bg-green-500"
        },
        {
            id: 3,
            title: "Formation React",
            date: "20 Oct 2024",
            time: "10:30",
            color: "bg-purple-500"
        }
    ]

    // Événements pour FullCalendar
    const calendarEvents = [
        {
            title: "Conférence sur l'IA",
            start: '2024-10-12',
            backgroundColor: '#f97316',
            borderColor: '#f97316'
        },
        {
            title: "Réunion d'équipe",
            start: '2024-10-15',
            backgroundColor: '#3b82f6',
            borderColor: '#3b82f6'
        },
        {
            title: "Présentation projet",
            start: '2024-10-18',
            backgroundColor: '#22c55e',
            borderColor: '#22c55e'
        },
        {
            title: "Formation React",
            start: '2024-10-20',
            backgroundColor: '#a855f7',
            borderColor: '#a855f7'
        }
    ]

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <style jsx global>{`
                                .fc {
                                    font-family: inherit;
                                }
                                .fc .fc-toolbar-title {
                                    font-size: 1.5rem;
                                    font-weight: bold;
                                    color: white;
                                    text-transform: uppercase;
                                }
                                .fc .fc-toolbar {
                                    background: linear-gradient(to right, #475569, #334155);
                                    padding: 1.5rem;
                                    margin-bottom: 0;
                                }
                                .fc .fc-button {
                                    background-color: transparent;
                                    border: none;
                                    color: white;
                                    font-weight: 600;
                                    padding: 0.5rem 1rem;
                                    transition: all 0.2s;
                                }
                                .fc .fc-button:hover {
                                    background-color: rgba(255, 255, 255, 0.2);
                                    border-radius: 0.5rem;
                                }
                                .fc .fc-button:focus {
                                    box-shadow: none;
                                }
                                .fc .fc-col-header {
                                    background: linear-gradient(to right, #475569, #334155);
                                }
                                .fc .fc-col-header-cell {
                                    color: white;
                                    font-weight: 600;
                                    padding: 0.75rem 0;
                                    text-transform: uppercase;
                                    font-size: 0.875rem;
                                }
                                .fc .fc-daygrid-body {
                                    background: linear-gradient(to bottom right, #f9fafb, #f3f4f6);
                                }
                                .fc .fc-daygrid-day {
                                    transition: all 0.2s;
                                }
                                .fc .fc-daygrid-day:hover {
                                    background-color: #f1f5f9;
                                }
                                .fc .fc-daygrid-day-frame {
                                    padding: 0.5rem;
                                    min-height: 80px;
                                }
                                .fc .fc-daygrid-day-number {
                                    font-size: 1.125rem;
                                    font-weight: 600;
                                    color: #1e293b;
                                    padding: 0.25rem;
                                }
                                .fc .fc-daygrid-day-top {
                                    flex-direction: row;
                                    justify-content: center;
                                }
                                .fc .fc-day-today {
                                    background-color: #fed7aa !important;
                                }
                                .fc .fc-day-today .fc-daygrid-day-number {
                                    background-color: #f97316;
                                    color: white;
                                    border-radius: 0.5rem;
                                    padding: 0.25rem 0.5rem;
                                    font-weight: bold;
                                }
                                .fc .fc-event {
                                    border-radius: 0.375rem;
                                    padding: 0.125rem 0.25rem;
                                    font-size: 0.75rem;
                                    margin-bottom: 0.125rem;
                                    cursor: pointer;
                                }
                                .fc .fc-event:hover {
                                    opacity: 0.8;
                                }
                                .fc .fc-scrollgrid {
                                    border: none;
                                }
                                .fc .fc-scrollgrid td {
                                    border-color: #e5e7eb;
                                }
                                .fc-theme-standard td, 
                                .fc-theme-standard th {
                                    border-color: #e5e7eb;
                                }
                            `}</style>

                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                locale={frLocale}
                                events={calendarEvents}
                                height="auto"
                                headerToolbar={{
                                    left: 'prev',
                                    center: 'title',
                                    right: 'next'
                                }}
                                buttonText={{
                                    today: "Aujourd'hui"
                                }}
                                eventDisplay="block"
                                dayMaxEvents={3}
                                fixedWeekCount={false}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                                <h3 className="text-white text-xl font-bold text-center">
                                    En direct
                                </h3>
                            </div>

                            <div className="p-6 bg-gray-100 min-h-[200px] flex flex-col justify-center">
                                <div className="bg-white rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-red-500 font-semibold text-sm">LIVE</span>
                                    </div>
                                    <h4 className="font-bold text-lg mb-2">{liveEvent.title}</h4>
                                    <p className="text-gray-600 text-sm mb-1">⏰ {liveEvent.time}</p>
                                    <p className="text-gray-600 text-sm">📍 {liveEvent.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-4 bg-slate-600 border-b border-slate-500">
                                <h3 className="text-white text-xl font-bold">À venir</h3>
                            </div>

                            <div className="p-4 bg-gray-100 space-y-3 min-h-[300px]">
                                {upcomingEvents.map(event => (
                                    <div
                                        key={event.id}
                                        className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`${event.color} w-1 h-full rounded-full`}></div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 mb-2">
                                                    {event.title}
                                                </h4>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>📅 {event.date}</span>
                                                    <span>⏰ {event.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}