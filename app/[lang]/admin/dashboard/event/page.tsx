"use client";

import ButtonComponent from "@app/components/button";
import SearchBarComponent from "@app/components/searchBar";
import EventDataTable, {
  ElementType,
  EventInterface,
  TableData,
} from "@app/components/eventDataTable";
import React, { useEffect, useState, useMemo } from "react";
import AddElementModal, {
  FormFieldConfig,
  InitialDataType,
} from "@app/components/addElement";
import { useRouter } from "next/navigation";
import Calendar from "@app/components/calendarCompenetWithFullCalendar";
import {
  CreateEvent,
  DeleteEvent,
  FetchEvents,
  UpdateEvent,
} from "@app/actions/EventsManager";
import LoadingComponent from "@app/components/loadingComponent";
import { toast } from "@app/components/FormComponent";
import ConfirmModal from "@app/components/ConfirmModal";
import { useTranslations } from "next-intl";

const TABS_INACTIVE_COLOR = "#5A8FAC";
const TABS_ACTIVE_COLOR = "#374151";

export interface EventLive {
  id?: string | undefined;
  title: string | undefined;
  url: string | undefined;
  status?: boolean;
}

const parseToISODate = (dateStr?: string) => {
  if (!dateStr) return "";

  if (dateStr.includes("-")) {
    return new Date(dateStr).toISOString();
  }

  const parts = dateStr.split("/");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const date = new Date(`${year}-${month}-${day}`);
    return date.toISOString();
  }

  return dateStr;
};

const formatToInputDate = (dateStr?: string) => {
  const isoStr = parseToISODate(dateStr);
  if (!isoStr) return "";
  return isoStr.split("T")[0];
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function EventPage() {
  const t = useTranslations("EventPage");

  const [allEvents, setAllEvents] = useState<EventInterface[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [eventLive, setEventLive] = useState<EventLive[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TableData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<ElementType | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const EventFields: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "title",
        label: t("fields.title"),
        type: "text",
        placeholder: t("fields.titlePlaceholder"),
        required: true,
      },
      {
        name: "location",
        label: t("fields.location"),
        type: "text",
        placeholder: t("fields.locationPlaceholder"),
        required: true,
      },
      {
        name: "date",
        label: t("fields.date"),
        type: "date",
        placeholder: t("fields.datePlaceholder"),
        required: true,
      },
      {
        name: "time",
        label: t("fields.time"),
        type: "time",
        placeholder: t("fields.timePlaceholder"),
        required: true,
      },
      {
        name: "description",
        label: t("fields.description"),
        type: "description",
        placeholder: t("fields.descriptionPlaceholder"),
        required: false,
      },
    ],
    [t],
  );

  const EventFieldsLive: FormFieldConfig[] = useMemo(
    () => [
      {
        name: "title",
        label: t("fields.title"),
        type: "text",
        placeholder: t("fields.titlePlaceholder"),
        required: false,
      },
      {
        name: "location",
        label: t("fields.location"),
        type: "text",
        placeholder: t("fields.locationPlaceholder"),
        required: true,
      },
      {
        name: "date",
        label: t("fields.date"),
        type: "date",
        placeholder: t("fields.datePlaceholder"),
        required: false,
      },
      {
        name: "description",
        label: t("fields.description"),
        type: "description",
        placeholder: t("fields.descriptionPlaceholder"),
        required: false,
      },
      {
        name: "time",
        label: t("fields.time"),
        type: "time",
        placeholder: t("fields.timePlaceholder"),
        required: true,
      },
      {
        name: "url",
        label: t("fields.url"),
        type: "text",
        placeholder: t("fields.urlPlaceholder"),
        required: false,
      },
    ],
    [t],
  );

  const mainHeaders = useMemo(
    () => [
      { key: "title", label: t("headers.title"), flexBasis: "25%" },
      { key: "location", label: t("headers.location"), flexBasis: "15%" },
      { key: "date", label: t("headers.date"), flexBasis: "15%" },
      { key: "time", label: t("headers.time"), flexBasis: "15%" },
      { key: "actions", label: t("headers.actions"), flexBasis: "15%" },
    ],
    [t],
  );

  const liveHeaders = useMemo(
    () => [
      { key: "title", label: t("headers.title"), flexBasis: "40%" },
      { key: "url", label: t("headers.url"), flexBasis: "30%" },
      { key: "actions", label: t("headers.actions"), flexBasis: "15%" },
    ],
    [t],
  );

  const pageContainerClasses = `min-h-screen font-sans`;

  const headerClasses = `
        flex flex-col md:flex-row justify-between items-start 
        md:items-center mb-4 gap-4 md:gap-0 p-5 md:p-10
    `;

  const textClasses = `
        m-0 text-2xl md:text-3xl lg:text-4xl font-light text-white
    `;

  const subTextClasses = `
        text-white text-sm md:text-base font-light
    `;

  const contentContainerClasses = `p-5 md:p-10`;

  const searchAndTabsClasses = `
        flex flex-col md:flex-row items-center gap-4 md:gap-5 
        my-5 md:my-8 justify-center md:justify-between
    `;

  const searchBarWrapperClasses = `flex-grow w-full md:max-w-xl`;

  const tabsClasses = `
        flex gap-0 bg-[${TABS_INACTIVE_COLOR.replace("#", "")}] 
        rounded-lg overflow-hidden p-1
    `;

  const tabButtonBaseClasses = `
        py-2 px-5 border-none cursor-pointer text-sm md:text-base 
        font-medium transition-all duration-200 bg-transparent 
        text-white rounded-md whitespace-nowrap
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
          date: newEvent.date || "",
        };

        setEvents((prevEvents) => [
          ...prevEvents,
          formattedEvent as EventInterface,
        ]);

        setAllEvents((prevAll) => [
          ...prevAll,
          formattedEvent as EventInterface,
        ]);
        toast(true, false, t("toastCreateSuccess"));
      } else {
        toast(false, false, t("toastCreateError"));
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'événement : ", error);
      toast(false, false, t("toastCreateError"));
    }
  };

  const handleSubmitEditEvent = async (data: EventInterface) => {
    try {
      const eventId = selectedEvent?.id as string;

      const hasUrl = Boolean(data?.url && data.url.trim() !== "");
      const eventData = {
        ...data,
        date: parseToISODate(data.date as string),
        status: hasUrl,
      };

      const updatedEvent = await UpdateEvent(eventId, eventData);

      if (updatedEvent && !Array.isArray(updatedEvent)) {
        const formattedEvent = {
          ...updatedEvent,
          date: formatDate(updatedEvent.date as string),
          status: updatedEvent.status,
          url: updatedEvent.url || "",
        };

        setAllEvents((prevAll) =>
          prevAll.map((e) =>
            e.id === updatedEvent.id ? (formattedEvent as EventInterface) : e,
          ),
        );

        if (updatedEvent.status) {
          setEventLive((prevLive) => {
            const exists = prevLive.find((e) => e.id === updatedEvent.id);
            return exists
              ? prevLive.map((e) =>
                  e.id === updatedEvent.id ? (formattedEvent as EventLive) : e,
                )
              : [...prevLive, formattedEvent as EventLive];
          });

          setEvents((prevEvents) =>
            prevEvents.filter((e) => e.id !== updatedEvent.id),
          );
        } else {
          setEvents((prevEvents) => {
            const exists = prevEvents.find((e) => e.id === updatedEvent.id);
            return exists
              ? prevEvents.map((e) =>
                  e.id === updatedEvent.id
                    ? (formattedEvent as EventInterface)
                    : e,
                )
              : [...prevEvents, formattedEvent as EventInterface];
          });

          setEventLive((prevLive) =>
            prevLive.filter((e) => e.id !== updatedEvent.id),
          );
        }

        setEditEvent(false);
        setSelectedEvent(null);
        toast(true, false, t("toastUpdateSuccess"));
      } else {
        toast(false, false, t("toastUpdateError"));
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement : ", error);
      toast(false, false, t("toastUpdateError"));
    }
  };

  let initialData: InitialDataType = {
    title: "",
    location: "",
    date: "",
    time: "",
    status: false,
    description: "",
  };
  let initialDataLive: InitialDataType = {
    title: "",
    url: "",
    status: false,
  };

  const handleEditEvent = (item: ElementType) => {
    const itemSelected = item as TableData;
    setSelectedEvent(itemSelected);
    setEditEvent(true);
  };

  if (selectedEvent) {
    initialData = {
      title: (selectedEvent.title as string) || "",
      location: (selectedEvent.location as string) || "",
      date: (selectedEvent.date as string) || "",
      time: (selectedEvent.time as string) || "",
      status: selectedEvent.status || false,
    };
  }

  if (selectedEvent) {
    initialDataLive = {
      title: (selectedEvent.title as string) || "",
      location: (selectedEvent.location as string) || "",
      date: formatToInputDate(selectedEvent.date as string) || "",
      time: (selectedEvent.time as string) || "",
      description: (selectedEvent.description as string) || "",
      url: (selectedEvent.url as string) || "",
      status: selectedEvent.status || false,
    };
  }

  const handleTabClick = (mode: "list" | "calendar") => {
    setViewMode(mode);
  };

  const handleDeleteEvent = (data: ElementType) => {
    setEventToDelete(data);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteEvent = async () => {
    if (!eventToDelete) return;
    setIsDeleteModalOpen(false);
    try {
      const deletedEvent = await DeleteEvent(eventToDelete.id as string);
      if (deletedEvent) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventToDelete.id),
        );
        setEventLive((prevLive) =>
          prevLive.filter((event) => event.id !== eventToDelete.id),
        );
        setAllEvents((prevAll) =>
          prevAll.filter((event) => event.id !== eventToDelete.id),
        );
        toast(true, false, t("toastDeleteSuccess"));
      } else {
        toast(false, false, t("toastDeleteError"));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement : ", error);
      toast(false, false, t("toastDeleteError"));
    } finally {
      setEventToDelete(null);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const fetchedEvents = await FetchEvents();
      if (fetchedEvents) {
        const liveEvents = fetchedEvents
          .filter((event) => event.status)
          .map((event) => ({
            id: event.id,
            title: event.title,
            url: event.url,
            status: true,
          }));

        const regularEvents = fetchedEvents
          .filter((event) => !event.status)
          .map((event) => ({
            ...event,
            date: formatDate(event.date as string),
            status: event.status,
          }));

        const allFormattedEvents = fetchedEvents.map((event) => ({
          ...event,
          date: formatDate(event.date as string),
          status: event.status,
        }));

        setAllEvents(allFormattedEvents);
        setEventLive(liveEvents);
        setEvents(regularEvents);
      }
      setIsLoading(false);
    })();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event &&
      (event?.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
        event?.location?.toLowerCase().includes(inputValue.toLowerCase()) ||
        event?.time?.toLowerCase().includes(inputValue.toLowerCase()) ||
        event?.status),
  );

  const filteredLiveEvents = eventLive.filter(
    (event) =>
      event &&
      (event?.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
        event?.url?.toLowerCase().includes(inputValue.toLowerCase()) ||
        event?.status),
  );

  return (
    <div className={pageContainerClasses}>
      <LoadingComponent
        isOpen={isLoading}
        onClose={() => setIsLoading(false)}
      />
      <div className={headerClasses}>
        <div>
          <h1 className={textClasses}>{t("title")}</h1>
          <h3 className={subTextClasses}>{t("subtitle")}</h3>
        </div>
        <ButtonComponent
          textButton={t("addEvent")}
          size="large"
          onclick={handleEvent}
        />
      </div>

      <div className={contentContainerClasses}>
        <div className={searchAndTabsClasses}>
          <div className={searchBarWrapperClasses}>
            <SearchBarComponent
              placeholder={t("searchPlaceholder")}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
          </div>

          <div className={tabsClasses}>
            <button
              className={`${tabButtonBaseClasses} ${viewMode === "list" ? `bg-[${TABS_ACTIVE_COLOR.replace("#", "")}] shadow-md text-white` : "bg-transparent text-white/90 hover:bg-white/10"}`}
              onClick={() => {
                handleTabClick("list");
                router.push("/admin/dashboard/event");
              }}
            >
              {t("tabList")}
            </button>

            <button
              className={`${tabButtonBaseClasses} ${viewMode === "calendar" ? `bg-[${TABS_ACTIVE_COLOR.replace("#", "")}] shadow-md text-white` : "bg-transparent text-white/90 hover:bg-white/10"}`}
              onClick={() => handleTabClick("calendar")}
            >
              {t("tabCalendar")}
            </button>
          </div>
        </div>

        {viewMode === "list" ? (
          <>
            <EventDataTable
              tableTitle=""
              data={filteredEvents}
              columnHeaders={mainHeaders}
              handleEditEvent={handleEditEvent}
              handleDeleteEvent={handleDeleteEvent}
            />

            <EventDataTable
              tableTitle={t("liveEventsTitle")}
              data={filteredLiveEvents}
              columnHeaders={liveHeaders}
              handleDeleteEvent={handleDeleteEvent}
            />
          </>
        ) : (
          <Calendar events={allEvents} />
        )}
      </div>

      <AddElementModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmitEvent}
        titleComponent={t("modalAddTitle")}
        buttonTitle={t("modalAddButton")}
        fields={EventFields}
        initialData={initialData}
      />

      <AddElementModal
        key={editEvent ? "new-media-open" : "new-media-closed"}
        isOpen={editEvent}
        onClose={() => setEditEvent(false)}
        onSubmit={handleSubmitEditEvent}
        titleComponent={t("modalEditTitle")}
        buttonTitle={t("modalEditButton")}
        fields={EventFieldsLive}
        initialData={initialDataLive}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteEvent}
        title={t("confirmDeleteTitle")}
      />
    </div>
  );
}
