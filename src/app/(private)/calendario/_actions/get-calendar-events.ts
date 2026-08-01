"use server";

import { apiClient } from "@/common/services/api/server-client";

export async function getCalendarEventsAction(params?: {
  startDate?: string;
  endDate?: string;
}) {
  const queryParams: Record<string, string | number> = { limit: 1000 };
  if (params?.startDate) queryParams.startDate = params.startDate;
  if (params?.endDate) queryParams.endDate = params.endDate;

  const [appointmentsRes, timeOffsRes, schedulesRes, notificationsRes] =
    await Promise.all([
      apiClient
        .callRoute("/appointments", { method: "get", queryParams })
        .catch(() => null),
      apiClient
        .callRoute("/time-offs", { method: "get", queryParams })
        .catch(() => null),
      apiClient
        .callRoute("/schedule-templates", { method: "get" })
        .catch(() => null),
      apiClient
        .callRoute("/notifications", { method: "get", queryParams })
        .catch(() => null),
    ]);

  const appointments = (appointmentsRes as { data?: unknown })?.data
    ? ((appointmentsRes as { data: unknown }).data as Array<{
        id: string;
        clientName: string;
        procedureName: string;
        startDate: string;
        endDate: string;
      }>)
    : [];

  const timeOffs = (timeOffsRes as { data?: unknown })?.data
    ? ((timeOffsRes as { data: unknown }).data as Array<{
        id: string;
        reason: string;
        startDate: string;
        endDate: string;
      }>)
    : [];

  const schedules = (schedulesRes as { data?: unknown })?.data
    ? ((schedulesRes as { data: unknown }).data as Array<{
        id: string;
        dayOfWeek: string;
        startTime: string;
        endTime: string;
      }>)
    : [];

  const notifications = (notificationsRes as { data?: unknown })?.data
    ? ((notificationsRes as { data: unknown }).data as Array<{
        id: string;
        type?: string;
        startDate?: string;
        endDate?: string;
        sendDate?: string;
        createdAt?: string;
        date?: string;
      }>)
    : [];

  const events = [];

  // Appointments (green)
  for (const app of appointments) {
    events.push({
      id: `app-${app.id}`,
      title: `${app.clientName} - ${app.procedureName}`,
      start: app.startDate,
      end: app.endDate,
      backgroundColor: "#10b981", // Emerald 500
      borderColor: "#059669",
      extendedProps: { type: "appointment", data: app },
    });
  }

  // Time-offs (red / blocked)
  for (const to of timeOffs) {
    events.push({
      id: `to-${to.id}`,
      title: `Ausência: ${to.reason}`,
      start: to.startDate,
      end: to.endDate,
      backgroundColor: "#ef4444", // Red 500
      borderColor: "#dc2626",
      extendedProps: { type: "time-off", data: to },
    });
  }

  // Notifications (blue/orange depending on type, or default orange)
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
      backgroundColor: "#f59e0b", // Amber 500
      borderColor: "#d97706",
      extendedProps: { type: "notification", data: notif },
    });
  }

  // Schedule Templates (recurring background events)
  // fullcalendar recurring events need daysOfWeek and startTime/endTime
  const dayOfWeekMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  for (const sched of schedules) {
    if (dayOfWeekMap[sched.dayOfWeek] !== undefined) {
      events.push({
        id: `sched-${sched.id}`,
        daysOfWeek: [dayOfWeekMap[sched.dayOfWeek]],
        startTime: sched.startTime,
        endTime: sched.endTime,
        display: "background",
        backgroundColor: "#e0e7ff", // Indigo 100 for available slots
      });
    }
  }

  return events;
}
