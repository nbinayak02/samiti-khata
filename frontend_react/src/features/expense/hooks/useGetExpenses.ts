import { MODULES } from "@/constants/constants";
import { getExpenses } from "../api/expense.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedQueryString } from "@/types/pagination.types";

export default function useGetExpenses({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString) {
  return useQuery({
    queryKey: [MODULES.EXPENSE, "page", pageIndex, pageSize, sortDir],
    queryFn: () => getExpenses({ pageIndex, pageSize, sortDir }),
    placeholderData: keepPreviousData,
  });
}
    