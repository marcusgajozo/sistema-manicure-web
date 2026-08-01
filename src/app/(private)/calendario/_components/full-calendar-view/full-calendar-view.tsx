"use client";

import "./calendar.css";
import "./calendar.css";

import { type EventInput } from "@fullcalendar/core";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useCallback, useRef, useState } from "react";

import { useModal } from "@/common/components/modal";
import { Select } from "@/common/components/select/select";

import { getCalendarEventsAction } from "../../_actions/get-calendar-events";
import { AppointmentModal } from "../appointment-modal";
import { NotificationModal } from "../notification-modal";
import { SelectTypeModal } from "../select-type-modal";
import { TimeOffModal } from "../time-off-modal";

type Option = { label: string; value: string };

export function FullCalendarView({
  clients = [],
  procedures = [],
}: {
  clients?: Option[];
  procedures?: Option[];
} = {}) {
  const [events, setEvents] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDateRange, setCurrentDateRange] = useState<{
    startStr: string;
    endStr: string;
  } | null>(null);
  const calendarRef = useRef<FullCalendar>(null);

  const [currentView, setCurrentView] = useState("dayGridMonth");
  const viewOptions = [
    { label: "Mês", value: "dayGridMonth" },
    { label: "Semana", value: "timeGridWeek" },
    { label: "Dia", value: "timeGridDay" },
    { label: "Lista", value: "listWeek" },
  ];

  const handleViewChange = (newView: string) => {
    setCurrentView(newView);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView);
    }
  };

  const selectTypeModal = useModal("select-type-modal");
  const appointmentModal = useModal("appointment-modal");
  const timeOffModal = useModal("time-off-modal");
  const notificationModal = useModal("notification-modal");

  const fetchEvents = useCallback(
    async (rangeToFetch?: { startStr: string; endStr: string }) => {
      const range = rangeToFetch || currentDateRange;
      if (!range) return;
      setLoading(true);
      try {
        const data = await getCalendarEventsAction({
          startDate: range.startStr,
          endDate: range.endStr,
        });
        setEvents(data);
      } catch (error) {
        console.error("Failed to load calendar events:", error);
      } finally {
        setLoading(false);
      }
    },
    [currentDateRange],
  );

  return (
    <div className="flex h-full w-full flex-col bg-card rounded-xl border shadow-sm p-4 relative">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-xl">
          <div className="text-sm text-muted-foreground font-medium animate-pulse">
            Carregando agenda...
          </div>
        </div>
      )}

      <div className="absolute right-4 top-4 z-10 w-36 hidden sm:block">
        <Select
          options={viewOptions}
          value={currentView}
          onChange={handleViewChange}
          placeholder="Visualização"
        />
      </div>

      <div className="flex-1 w-full h-[calc(100vh-12rem)] min-h-[600px] overflow-hidden relative">
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView={currentView}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          locale={ptBrLocale}
          events={events as EventInput[]}
          datesSet={(info) => {
            const newRange = {
              startStr: info.startStr,
              endStr: info.endStr,
            };
            setCurrentDateRange(newRange);
            setTimeout(() => {
              void fetchEvents(newRange);
            }, 0);
          }}
          allDaySlot={false}
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          expandRows={true}
          stickyHeaderDates={true}
          height="100%"
          selectable={true}
          select={(info) => {
            selectTypeModal.open({
              initialData: {
                startDate: info.startStr,
                endDate: info.endStr,
              },
            });
            info.view.calendar.unselect();
          }}
          eventClick={(info) => {
            const ext = info.event.extendedProps;
            if (ext.type === "appointment") {
              appointmentModal.open({
                mode: "edit",
                initialData: {
                  ...ext.data,
                  id: ext.data.id,
                },
              });
            } else if (ext.type === "time-off") {
              timeOffModal.open({
                mode: "edit",
                initialData: {
                  ...ext.data,
                  id: ext.data.id,
                },
              });
            } else if (ext.type === "notification") {
              notificationModal.open({
                initialData: {
                  ...ext.data,
                  id: ext.data.id,
                },
              });
            }
          }}
        />
      </div>

      <SelectTypeModal />
      <AppointmentModal
        onSuccess={() => {
          void fetchEvents();
        }}
        clients={clients}
        procedures={procedures}
      />
      <TimeOffModal
        onSuccess={() => {
          void fetchEvents();
        }}
      />
      <NotificationModal
        onSuccess={() => {
          void fetchEvents();
        }}
      />
    </div>
  );
}
