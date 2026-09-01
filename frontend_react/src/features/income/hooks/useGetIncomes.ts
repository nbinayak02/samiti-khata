import { getIncomes } from "../api/income.api";
import { MODULES } from "@/constants/constants";
import type { IncomeQueryParams } from "@/types/pagination.types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetIncomes({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
  searchKey,
  searchColumn,
  receiptBookId,
  committeeId,
}: IncomeQueryParams) {
  return useQuery({
    queryKey: [
      MODULES.INCOME,
      "page",
      pageIndex,
      pageSize,
      sortDir,
      searchKey,
      searchColumn,
      receiptBookId,
      committeeId,
    ],
    enabled: searchColumn && !searchKey ? false : true,
    queryFn: () =>
      getIncomes({
        pageIndex,
        pageSize,
        sortDir,
        searchKey,
        searchColumn,
        receiptBookId,
        committeeId,
      }),
    placeholderData: keepPreviousData,
  });
}
