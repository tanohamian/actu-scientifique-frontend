import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import frlocale from '@fullcalendar/core/locales/fr';
import { EventInterface } from '@app/components/eventDataTable';
import { useState } from 'react';

interface CalendarProps {
  events: EventInterface[];
}

interface SelectedEventDetails {
  title: string;
  location?: string;
  status?: string;
  description?: string;
  url?: string;
  date?: string;
  time?: string;
}

export default function Calendar({ events }: CalendarProps) {
  const [selectedEvent, setSelectedEvent] = useState<SelectedEventDetails | null>(null);

  const calendarEvents = events.map(event => {
    let dateStr: string;

    if (event.date) {
      const dateObj = new Date(event.date);
      const year = dateObj.getUTCFullYear();
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getUTCDate()).padStart(2, '0');

      if (event.time) {
        dateStr = `${year}-${month}-${day}T${event.time}`;
      } else {
        dateStr = `${year}-${month}-${day}`;
      }
    } else {
      dateStr = new Date().toISOString();
    }

    return {
      id: event.id,
      title: event.title || 'Sans titre',
      start: dateStr,
      extendedProps: {
        location: event.location,
        status: event.status,
        description: event.description,
        url: event.url,
        date: event.date,
        time: event.time
      },
      backgroundColor: event.status ? '#10b981' : '#3b82f6',
      borderColor: event.status  ? '#059669' : '#2563eb'
    };
  });

  const handleEventClick = (info: any) => {
    const event = info.event;
    setSelectedEvent({
      title: event.title,
      location: event.extendedProps.location,
      status: event.extendedProps.status,
      description: event.extendedProps.description,
      url: event.extendedProps.url,
      date: event.extendedProps.date,
      time: event.extendedProps.time
    });
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={frlocale}
          events={calendarEvents}
          height="auto"
          eventClick={handleEventClick}
          eventDisplay="block"
          displayEventTime={true}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
        />
      </div>

      {/* Modal personnalisé */}
      {selectedEvent && (
        <div
          className="fixed inset-0   flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {selectedEvent.title}
                  </h2>
                  {selectedEvent.status && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${selectedEvent.status === 'en direct'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                      }`}>
                      {selectedEvent.status === 'en direct' ? '🔴 En direct' : '📅 Programmé'}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Date et heure */}
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date et heure</p>
                  <p className="text-gray-900 capitalize">{formatDate(selectedEvent.date)}</p>
                  {selectedEvent.time && (
                    <p className="text-gray-700">à {selectedEvent.time}</p>
                  )}
                </div>
              </div>

              {/* Lieu */}
              {selectedEvent.location && (
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Lieu</p>
                    <p className="text-gray-900">{selectedEvent.location}</p>
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedEvent.description && (
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-gray-900">{selectedEvent.description}</p>
                  </div>
                </div>
              )}

              {/* URL */}
              {selectedEvent.url && (
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Lien</p>
                    <a
                      href={selectedEvent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                    >
                      {selectedEvent.url}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-lg">
              <button
                onClick={closeModal}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}