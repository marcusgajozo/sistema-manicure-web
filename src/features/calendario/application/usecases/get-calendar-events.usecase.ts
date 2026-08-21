import type {
  CalendarEvent,
  CalendarEventsQuery,
} from "../../domain/entities/calendar-event.entity";
import type { CalendarRepository } from "../../domain/repositories/calendar.repository";

export class GetCalendarEventsUseCase {
  constructor(private repository: CalendarRepository) {}

  execute(query?: CalendarEventsQuery): Promise<CalendarEvent[]> {
    return this.repository.getEvents(query);
  }
}
