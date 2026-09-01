import axiosInstance from "@/lib/axios";
import type { Expense } from "../types/expense.types";
import type { ExpenseQueryParams } from "@/types/pagination.types";
import type { CreateExpensePayload } from "../schemas/expense.schema";
import type { APIResponsePaginated } from "@/types/apiResponse.types";

export async function createExpense(data: CreateExpensePayload) {
  const response = await axiosInstance.post(`/expense`, data);
  return response.data.data;
}

export async function getExpenses({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
  searchKey = "",
  searchColumn = "",
  categoryId = "",
  committeeId = "",
}: ExpenseQueryParams): Promise<APIResponsePaginated<Expense[]>> {
  const response = await axiosInstance.get(
    `/expense?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}&searchKey=${searchKey}&searchColumn=${searchColumn}&categoryId=${categoryId}&committeeId=${committeeId}`,
  );
  return response.data;
}
