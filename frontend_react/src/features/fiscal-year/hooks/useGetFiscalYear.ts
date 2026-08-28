import { MODULES } from "@/constants/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedQueryString } from "@/types/pagination.types";
import { getFiscalYear } from "../api/fiscal-year.api";

export default function useGetFiscalYears(
  { pageIndex = 1, pageSize = 25, sortDir = "desc" }: PaginatedQueryString = {
    pageIndex: 1,
    pageSize: 25,
  },
) {
  return useQuery({
    queryKey: [MODULES.FISCAL_YEAR, "page", pageIndex, pageSize, sortDir],
    queryFn: () => getFiscalYear({ pageIndex, pageSize, sortDir }),
    placeholderData: keepPreviousData,
  });
}
