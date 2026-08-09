export const MUTATION_KEYS = {
  LOGIN: "LOGIN",
  CREATE: "CREATE",
  COMMITTEE: "COMMITTEE",
  EXPENSE: "EXPENSE"
} as const;

export type MUTATION_KEYS = (typeof MUTATION_KEYS)[keyof typeof MUTATION_KEYS];
