export const QUERY_KEYS = {
  INCOME: "INCOME",
  ADD_INCOME: "ADD_INCOME",
  EXPENSE: "EXPENSE",
  RECEIPT_BOOK: "RECEIPT_BOOK",
  ASSIGN_BOOK: "ASSIGN_BOOK",
  RETURN_BOOK: "RETURN_BOOK",
} as const;

export type QueryKeys = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
