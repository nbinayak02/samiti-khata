import axiosInstance from "@/lib/axios";
import type { Income } from "../types/income.types";
import type { IncomeQueryParams } from "@/types/pagination.types";
import type { CreateIncomePayload } from "../schemas/income.schema";
import type { APIResponsePaginated } from "@/types/apiResponse.types";

export async function createIncome(data: CreateIncomePayload) {
  const response = await axiosInstance.post(`/income`, data);
  return response.data.data;
}

export async function getIncomes({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
  searchKey = "",
  searchColumn = "",
  receiptBookId = "",
  committeeId = "",
}: IncomeQueryParams): Promise<APIResponsePaginated<Income[]>> {
  const response = await axiosInstance.get(
    `/income?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}&searchKey=${searchKey}&searchColumn=${searchColumn}&receiptBookId=${receiptBookId}&committeeId=${committeeId}`,
  );
  return response.data;
}
