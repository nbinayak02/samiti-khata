import { MODULES } from "@/constants/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedQueryString } from "@/types/pagination.types";
import { getExpenseCategories } from "../api/expense-category.api";

export default function useGetExpenseCategories(
  { pageIndex = 1, pageSize = 25, sortDir = "desc" }: PaginatedQueryString = {
    pageIndex: 1,
    pageSize: 25,
  },
) {
  return useQuery({
    queryKey: [MODULES.EXPENSE_CATEGORY, "page", pageIndex, pageSize, sortDir],
    queryFn: () => getExpenseCategories({ pageIndex, pageSize, sortDir }),
    placeholderData: keepPreviousData,
  });
}
