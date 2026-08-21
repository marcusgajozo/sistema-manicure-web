"use server";

import { getCalendarioUseCases } from "@/features/calendario/composition";

export async function getCalendarEventsAction(params?: {
  startDate?: string;
  endDate?: string;
}) {
  return getCalendarioUseCases().getEvents.execute(params);
}
