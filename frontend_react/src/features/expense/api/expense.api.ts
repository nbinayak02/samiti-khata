import axiosInstance from "@/lib/axios";
import type { CreateExpensePayload } from "../schemas/expense.schema";
import type { Income } from "../types/expense.types";
import type { APIResponsePaginated } from "@/types/apiResponse.types";
import type { PaginatedQueryString } from "@/types/pagination.types";

export async function createExpense(data: CreateExpensePayload) {
  const response = await axiosInstance.post(`/expense`, data);
  return response.data.data;
}

export async function getExpenses({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString): Promise<APIResponsePaginated<Income[]>> {
  const response = await axiosInstance.get(
    `/expense?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}`,
  );
  return response.data;
}
