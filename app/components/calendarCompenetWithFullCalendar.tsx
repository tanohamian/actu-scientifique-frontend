import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import frlocale from '@fullcalendar/core/locales/fr';
import { EventInterface } from '@/app/components/eventDataTable';

interface CalendarProps {
  events: EventInterface[];
}

export default function Calendar({ events }: CalendarProps) {
  const calendarEvents = events.map(event => ({
    id: event.id,
    title: event.title || 'Sans titre',
    start: event.date ? new Date(event.date) : new Date(),
    ...(event.time && event.date && {
      start: new Date(`${event.date}T${event.time}`)
    }),
    extendedProps: {
      location: event.location,
      status: event.status,
      description: event.description,
      url: event.url
    },
    backgroundColor: event.status === 'en direct' ? '#10b981' : '#3b82f6',
    borderColor: event.status === 'en direct' ? '#059669' : '#2563eb'
  }));

  return (
    <div className="bg-white rounded-lg p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locale={frlocale}
        events={calendarEvents}
        height="auto"
        eventClick={(info) => {
          const event = info.event;
          alert(`
            Titre: ${event.title}
            Lieu: ${event.extendedProps.location || 'Non spécifié'}
            Statut: ${event.extendedProps.status || 'Non spécifié'}
            ${event.extendedProps.description ? `Description: ${event.extendedProps.description}` : ''}
          `);
        }}
        eventDisplay="block"
        displayEventTime={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
      />
    </div>
  );
}