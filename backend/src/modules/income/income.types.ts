import z from "zod";
import incomeSchema from "./income.schema";

export type TIncomeFormData = z.infer<typeof incomeSchema>

export type TSearchByDocument = {
  committeeId?: string | undefined;
  billNumber?: string | undefined;
  bookNumber?: string | undefined;
  fromDate?: string | undefined;
  toDate?: string | undefined;
  billIssuerId?: number | undefined;
  currentPage?: number | undefined;
  pageSize?: number | undefined;
};

export type TSearchByName = Omit<
  TSearchByDocument,
  "billNumber" | "bookNumber"
> & {
  name?: string | undefined;
};

export type TSearchByDocumentWhereClause = {
  committeeId?: number;
  billNumber?: string;
  bookNumber?: string;
  date?: {
    gte?: Date;
    lte?: Date;
  };
  billIssuerId?: number;
  pageNumber?: number;
  pageSize?: number;
};

export type TSearchByNameWhereClause = Omit<
  TSearchByDocumentWhereClause,
  "billNumber" | "bookNumber"
> & {
  name?: {
    contains: string;
    mode: "insensitive";
  };
};

