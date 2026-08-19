import axiosInstance from "@/lib/axios";
import type { ExpenseCategorySchema } from "../schemas/expense-category.schema";
import type { ExpenseCategory } from "../types/expense-category.types";

export async function createExpenseCategory(data: ExpenseCategorySchema) {
  const response = await axiosInstance.post(`/category`, data);
  return response.data.data;
}

export async function getExpenseCategories():Promise<ExpenseCategory[]> {
  const response = await axiosInstance.get(`/category`);
  return response.data.data;
}

