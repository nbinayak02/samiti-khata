import axiosInstance from "@/lib/axios";
import type { CreateExpenseSchema } from "../schemas/expense.schema";

export async function createExpense(data: CreateExpenseSchema) {
  const response = await axiosInstance.post(`/expense`, data);
  return response.data.data;
}
