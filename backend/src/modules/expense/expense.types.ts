import z from "zod";
import { expenseSchema, expenseUpdateSchema } from "./expense.schema";

export type TExpenseFormData = z.infer<typeof expenseSchema>;
export type TExpenseUpdate = z.infer<typeof expenseUpdateSchema>;

export type ExpensePaymentMode = "CASH" | "CHEQUE" | "ONLINE";
export type ExpenseDocumentType = "BILL" | "VOUCHER";

export type TExpenseSearchWhereClause = {
  committeeId?: number;
  categoryId?: number;
  name?: string;
  address?: string;
  paymentMode?: ExpensePaymentMode;
  documentType?: ExpenseDocumentType;
  date?: {
    gte?: Date;
    lte?: Date;
  };
};

export type TExpenseSearch = Omit<TExpenseSearchWhereClause, "date"> & {
  fromDate?: string;
  toDate?: string;
  currentPage?: number;
  pageSize?: number;
};
