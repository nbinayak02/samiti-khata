import {
  BackendResponsePaginated,
  ReturnType,
  TablePaginationState,
} from "@/features/shared.types";
import { IncomeDto } from "@/api/types";
import makeRequest from "@/lib/api/server.client";

export async function getIncomes({
  pageIndex,
  pageSize,
}: TablePaginationState): Promise<ReturnType<IncomeDto>> {
  const res = await makeRequest<BackendResponsePaginated<IncomeDto[]>>(
    `/income?pageIndex=${pageIndex + 1}&pageSize=${pageSize}`,
    { cache: "no-store" },
  );

  return {
    data: res.data,
    meta: {
      ...res.meta,
      pageIndex: Math.max(0, pageIndex - 1),
    },
  };
}
