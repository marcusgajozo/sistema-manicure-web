import type {
  CalendarEvent,
  CalendarEventsQuery,
} from "../entities/calendar-event.entity";

export interface CalendarRepository {
  getEvents(query?: CalendarEventsQuery): Promise<CalendarEvent[]>;
}
