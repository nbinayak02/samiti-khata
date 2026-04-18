import z from "zod";
import { incomeSchema, incomeUpdateSchema } from "./income.schema";

export type TIncomeFormData = z.infer<typeof incomeSchema>;
export type TIncomeUpdate = z.infer<typeof incomeUpdateSchema>;

export type TSearchIncome = {
  name?: string | undefined;
  committeeId?: string | undefined;
  billNumber?: string | undefined;
  bookNumber?: string | undefined;
  fromDate?: string | undefined;
  toDate?: string | undefined;
  billIssuerId?: number | undefined;
  currentPage?: number | undefined;
  pageSize?: number | undefined;
};

export type TSearchIncomeWhereClause = {
  name?: {
    contains: string;
    mode: "insensitive";
  };
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
