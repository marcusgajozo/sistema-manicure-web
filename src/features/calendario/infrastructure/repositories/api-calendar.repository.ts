import { DAY_OF_WEEK_MAP } from "@/common/constants/day-of-week-map";
import { apiClient } from "@/common/services/api/server-client";
import { getAgendamentosUseCases } from "@/features/agendamentos/composition";
import { getTimeOffsUseCases } from "@/features/time-offs/composition";

import type { CalendarEvent } from "../../domain/entities/calendar-event.entity";
import type { CalendarRepository } from "../../domain/repositories/calendar.repository";

const EVENT_COLORS = {
  APPOINTMENT: {
    backgroundColor: "#10b981",
    borderColor: "#059669",
  },
  TIME_OFF: {
    backgroundColor: "#ef4444",
    borderColor: "#dc2626",
  },
  NOTIFICATION: {
    backgroundColor: "#f59e0b",
    borderColor: "#d97706",
  },
  SCHEDULE: {
    backgroundColor: "#e0e7ff",
  },
} as const;

export class ApiCalendarRepository implements CalendarRepository {
  async getEvents(query?: {
    startDate?: string;
    endDate?: string;
  }): Promise<CalendarEvent[]> {
    const queryParams: Record<string, string | number> = { limit: 1000 };
    if (query?.startDate) queryParams.startDate = query.startDate;
    if (query?.endDate) queryParams.endDate = query.endDate;

    const [appointmentsRes, timeOffsRes, schedulesRes, notificationsRes] =
      await Promise.all([
        getAgendamentosUseCases().list.execute({
          limit: 1000,
        }),
        getTimeOffsUseCases().list.execute({ limit: 1000 }),
        apiClient.callRoute("/schedule-templates", {
          method: "get",
          queryParams,
        }),
        apiClient.callRoute("/notifications", {
          method: "get",
          queryParams,
        }),
      ]);

    const appointments = appointmentsRes.items.map((entity) => {
      const plain = entity.toPlain();
      return {
        id: `app-${plain.id}`,
        title: `${plain.clientName ?? ""} - ${plain.procedureName ?? ""}`,
        start: plain.startDate ?? "",
        end: plain.endDate ?? "",
        backgroundColor: EVENT_COLORS.APPOINTMENT.backgroundColor,
        borderColor: EVENT_COLORS.APPOINTMENT.borderColor,
        kind: "appointment" as const,
        raw: plain,
      };
    });

    const timeOffs = timeOffsRes.items.map((entity) => {
      const plain = entity.toPlain();
      return {
        id: `to-${plain.id}`,
        title: `Ausência: ${plain.reason}`,
        start: plain.startDate ?? "",
        end: plain.endDate ?? "",
        backgroundColor: EVENT_COLORS.TIME_OFF.backgroundColor,
        borderColor: EVENT_COLORS.TIME_OFF.borderColor,
        kind: "time-off" as const,
        raw: plain,
      };
    });

    const notifications = (notificationsRes.data ?? []).map(
      (notif: Record<string, unknown>) => {
        const start =
          (notif.startDate as string) ||
          (notif.sendDate as string) ||
          (notif.createdAt as string) ||
          (notif.date as string) ||
          "";
        const end =
          (notif.endDate as string) ||
          (notif.startDate as string) ||
          (notif.sendDate as string) ||
          (notif.createdAt as string) ||
          (notif.date as string) ||
          "";

        return {
          id: `notif-${notif.id}`,
          title: `Notificação${notif.type ? ` - ${notif.type}` : ""}`,
          start,
          end,
          backgroundColor: EVENT_COLORS.NOTIFICATION.backgroundColor,
          borderColor: EVENT_COLORS.NOTIFICATION.borderColor,
          kind: "notification" as const,
          raw: notif,
        };
      },
    );

    const schedules = (schedulesRes.data ?? [])
      .filter((sched: { dayOfWeek: keyof typeof DAY_OF_WEEK_MAP }) =>
        DAY_OF_WEEK_MAP[sched.dayOfWeek] !== undefined ? true : false,
      )
      .map(
        (sched: {
          id: string;
          dayOfWeek: keyof typeof DAY_OF_WEEK_MAP;
          startTime: string;
          endTime: string;
        }) => ({
          id: `sched-${sched.id}`,
          title: "",
          start: "",
          end: "",
          daysOfWeek: [DAY_OF_WEEK_MAP[sched.dayOfWeek]],
          startTime: sched.startTime,
          endTime: sched.endTime,
          display: "background",
          backgroundColor: EVENT_COLORS.SCHEDULE.backgroundColor,
          kind: "schedule" as const,
          raw: sched,
        }),
      );

    return [...appointments, ...timeOffs, ...notifications, ...schedules];
  }
}
