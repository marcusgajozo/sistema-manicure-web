import { GetCalendarEventsUseCase } from "./application/usecases/get-calendar-events.usecase";
import { ApiCalendarRepository } from "./infrastructure/repositories/api-calendar.repository";

function createCalendarRepository() {
  return new ApiCalendarRepository();
}

export function getCalendarioUseCases() {
  const repository = createCalendarRepository();

  return {
    getEvents: new GetCalendarEventsUseCase(repository),
  };
}
