export type CalendarEventKind =
  | "appointment"
  | "time-off"
  | "notification"
  | "schedule";

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  backgroundColor?: string;
  borderColor?: string;
  daysOfWeek?: number[];
  startTime?: string;
  endTime?: string;
  display?: string;
  kind: CalendarEventKind;
  raw: unknown;
}

export type CalendarEventsQuery = {
  startDate?: string;
  endDate?: string;
};

export type GetCalendarEventsResult = {
  events: CalendarEvent[];
};
