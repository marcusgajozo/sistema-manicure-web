"use server";

import { DAY_OF_WEEK_MAP } from "@/common/constants/day-of-week-map";
import { apiClient } from "@/common/services/api/server-client";

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

export async function getCalendarEventsAction(params?: {
  startDate?: string;
  endDate?: string;
}) {
  const queryParams: Record<string, string | number> = { limit: 1000 };
  if (params?.startDate) queryParams.startDate = params.startDate;
  if (params?.endDate) queryParams.endDate = params.endDate;

  const [appointmentsRes, timeOffsRes, schedulesRes, notificationsRes] =
    await Promise.all([
      apiClient.callRoute("/appointments", { method: "get", queryParams }),
      apiClient.callRoute("/time-offs", { method: "get", queryParams }),
      apiClient.callRoute("/schedule-templates", {
        method: "get",
        queryParams,
      }),
      apiClient.callRoute("/notifications", { method: "get", queryParams }),
    ]);

  const appointments = appointmentsRes.data;
  const timeOffs = timeOffsRes.data;
  const schedules = schedulesRes.data;
  const notifications = notificationsRes.data;

  const events = [];

  for (const app of appointments) {
    events.push({
      id: `app-${app.id}`,
      title: `${app.clientName} - ${app.procedureName}`,
      start: app.startDate,
      end: app.endDate,
      backgroundColor: EVENT_COLORS.APPOINTMENT.backgroundColor,
      borderColor: EVENT_COLORS.APPOINTMENT.borderColor,
      extendedProps: { type: "appointment", data: app },
    });
  }

  for (const to of timeOffs) {
    events.push({
      id: `to-${to.id}`,
      title: `Ausência: ${to.reason}`,
      start: to.startDate,
      end: to.endDate,
      backgroundColor: EVENT_COLORS.TIME_OFF.backgroundColor,
      borderColor: EVENT_COLORS.TIME_OFF.borderColor,
      extendedProps: { type: "time-off", data: to },
    });
  }

  for (const notif of notifications) {
    events.push({
      id: `notif-${notif.id}`,
      title: `Notificação${notif.type ? ` - ${notif.type}` : ""}`,
      start: notif.startDate || notif.sendDate || notif.createdAt || notif.date,
      end:
        notif.endDate ||
        notif.startDate ||
        notif.sendDate ||
        notif.createdAt ||
        notif.date,
      backgroundColor: EVENT_COLORS.NOTIFICATION.backgroundColor,
      borderColor: EVENT_COLORS.NOTIFICATION.borderColor,
      extendedProps: { type: "notification", data: notif },
    });
  }

  for (const sched of schedules) {
    if (
      DAY_OF_WEEK_MAP[sched.dayOfWeek as keyof typeof DAY_OF_WEEK_MAP] !==
      undefined
    ) {
      events.push({
        id: `sched-${sched.id}`,
        daysOfWeek: [
          DAY_OF_WEEK_MAP[sched.dayOfWeek as keyof typeof DAY_OF_WEEK_MAP],
        ],
        startTime: sched.startTime,
        endTime: sched.endTime,
        display: "background",
        backgroundColor: EVENT_COLORS.SCHEDULE.backgroundColor,
      });
    }
  }

  return events;
}
