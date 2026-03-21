import z from "zod";
import ExpenseSchema from "./expense.schema";

export type TExpenseFormData = z.infer<typeof ExpenseSchema>;
