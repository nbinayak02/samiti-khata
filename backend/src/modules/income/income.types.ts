import z from "zod";
import incomeSchema from "./income.schema";

export type TIncomeFormData = z.infer<typeof incomeSchema>
