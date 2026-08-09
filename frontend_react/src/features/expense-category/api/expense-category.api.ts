import axiosInstance from "@/lib/axios";
import type { ExpenseCategorySchema } from "../schemas/expense-category.schema";

export async function createExpenseCategory(data: ExpenseCategorySchema) {
  const response = await axiosInstance.post(`/category`, data);
  return response.data.data;
}
