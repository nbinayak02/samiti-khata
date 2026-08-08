export const BookStatus = {
  AVAILABLE: "AVAILABLE",
  ASSIGNED: "ASSIGNED",
  RETURNED: "RETURNED",
} as const;

export type BookStatus = (typeof BookStatus)[keyof typeof BookStatus];
