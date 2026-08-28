import axiosInstance from "@/lib/axios";
import type { ExpenseCategorySchema } from "../schemas/expense-category.schema";
import type { PaginatedQueryString } from "@/types/pagination.types";
import type { APIResponsePaginated } from "@/types/apiResponse.types";
import type { ExpenseCategory } from "../types/expense-category.types";

export async function createExpenseCategory(data: ExpenseCategorySchema) {
  const response = await axiosInstance.post(`/category`, data);
  return response.data.data;
}

export async function getExpenseCategories({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString): Promise<APIResponsePaginated<ExpenseCategory[]>> {
  const response = await axiosInstance.get(
    `/category?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}`,
  );
  return response.data;
}
