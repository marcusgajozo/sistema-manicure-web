export const DAY_OF_WEEK_LIST = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export const DAY_OF_WEEK_MAP: Record<
  (typeof DAY_OF_WEEK_LIST)[number],
  number
> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};
