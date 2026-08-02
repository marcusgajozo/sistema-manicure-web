import { z } from "zod";

import { DAY_OF_WEEK_LIST } from "@/common/constants/day-of-week-map";

export const createScheduleTemplateDtoSchema = z.object({
  dayOfWeek: z.enum(DAY_OF_WEEK_LIST),
  startTime: z.string(),
  endTime: z.string(),
});

export const updateScheduleTemplateDtoSchema = z.object({
  dayOfWeek: z.enum(DAY_OF_WEEK_LIST).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export const scheduleTemplateSchema = z.object({
  id: z.string(),
  dayOfWeek: z.enum(DAY_OF_WEEK_LIST),
  startTime: z.string(),
  endTime: z.string(),
});

export const scheduleTemplatesResponseSchema = z.object({
  data: z.array(scheduleTemplateSchema),
});
