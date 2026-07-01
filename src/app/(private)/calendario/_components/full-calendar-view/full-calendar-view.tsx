/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "./calendar.css"; // Custom overrides
import "./calendar.css"; // Custom overrides

import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCallback, useEffect, useRef, useState } from "react";

import { getCalendarEventsAction } from "../../_actions/get-calendar-events";
import { EventModal } from "../event-modal";

type Option = { label: string; value: string };

export function FullCalendarView({
  clients,
  procedures,
}: {
  clients: Option[];
  procedures: Option[];
}) {
  const [events, setEvents] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef<FullCalendar>(null);

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    eventType: "appointment" | "time-off" | "select-type";
    initialData: Record<string, unknown> | null;
  }>({
    isOpen: false,
    mode: "create",
    eventType: "select-type",
    initialData: null,
  });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCalendarEventsAction();
      setEvents(data);
    } catch (error) {
      console.error("Failed to load calendar events:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="flex h-full w-full flex-col bg-card rounded-xl border shadow-sm p-4 relative">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-xl">
          <div className="text-sm text-muted-foreground font-medium animate-pulse">
            Carregando agenda...
          </div>
        </div>
      )}
      <div className="flex-1 w-full h-[calc(100vh-12rem)] min-h-[600px] overflow-hidden">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          locale={ptBrLocale}
          events={events as any}
          allDaySlot={false}
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          expandRows={true}
          stickyHeaderDates={true}
          height="100%"
          selectable={true}
          select={(info) => {
            setModalState({
              isOpen: true,
              mode: "create",
              eventType: "select-type",
              initialData: {
                startDate: info.startStr,
                endDate: info.endStr,
              },
            });
            info.view.calendar.unselect();
          }}
          eventClick={(info) => {
            const ext = info.event.extendedProps;
            if (ext.type === "appointment" || ext.type === "time-off") {
              setModalState({
                isOpen: true,
                mode: "edit",
                eventType: ext.type,
                initialData: {
                  ...ext.data,
                  id: ext.data.id, // ensure ID is passed
                },
              });
            }
          }}
        />
      </div>

      <EventModal
        isOpen={modalState.isOpen}
        onOpenChange={(open) => setModalState({ ...modalState, isOpen: open })}
        modalState={modalState}
        setModalState={setModalState}
        onSuccess={() => {
          void fetchEvents(); // re-fetch after mutating
        }}
        clients={clients}
        procedures={procedures}
      />
    </div>
  );
}
