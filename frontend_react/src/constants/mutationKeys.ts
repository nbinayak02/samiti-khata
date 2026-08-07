export const MUTATION_KEYS = {
  LOGIN: "LOGIN",
} as const;

export type MUTATION_KEYS = (typeof MUTATION_KEYS)[keyof typeof MUTATION_KEYS];
