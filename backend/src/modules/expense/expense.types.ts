import z from "zod";
import ExpenseSchema from "./expense.schema";

export type TExpenseFormData = z.infer<typeof ExpenseSchema>;

export type TExpenseSearchWhereClause = {
  committeeId?: number;
  categoryId?: number;
  name?: string;
  address?: string;
  paymentMode?: "CASH" | "CHEQUE" | "ONLINE";
  documentType?: "BILL" | "VOUCHER";
  date?: {
    gte?: Date;
    lte?: Date;
  };
};

export type TExpenseSearch = Omit<TExpenseSearchWhereClause, "date"> & {
  fromDate?: string;
  toDate?: string;
  currentPage?:number;
  pageSize?:number
};
