import axiosInstance from "@/lib/axios";
import type { CreateIncomePayload } from "../schemas/income.schema";
import type { PaginatedQueryString } from "@/types/pagination.types";
import type { APIResponsePaginated } from "@/types/apiResponse.types";
import type { Income } from "../types/income.types";

export async function createIncome(data: CreateIncomePayload) {
  const response = await axiosInstance.post(`/income`, data);
  return response.data.data;
}

export async function getIncomes({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString): Promise<APIResponsePaginated<Income[]>> {
  const response = await axiosInstance.get(
    `/income?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}`,
  );
  return response.data;
}