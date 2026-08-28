import axiosInstance from "@/lib/axios";
import type { FiscalYearSchema } from "../schemas/fiscal-year.schema";
import type { FiscalYear } from "../types/fiscalYear.types";
import type { PaginatedQueryString } from "@/types/pagination.types";
import type { APIResponsePaginated } from "@/types/apiResponse.types";

export async function createFiscalYear(data: FiscalYearSchema) {
  const response = await axiosInstance.post(`/fiscal-year`, data);
  return await response.data.data;
}

export async function getFiscalYear({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString): Promise<APIResponsePaginated<FiscalYear[]>> {
  const response = await axiosInstance.get(
    `/fiscal-year?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}`,
  );
  return response.data;
}
