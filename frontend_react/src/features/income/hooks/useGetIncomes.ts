import { MODULES } from "@/constants/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedQueryString } from "@/types/pagination.types";
import { getIncomes } from "../api/income.api";

export default function useGetIncomes({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString) {
  return useQuery({
    queryKey: [MODULES.INCOME, "page", pageIndex, pageSize, sortDir],
    queryFn: () => getIncomes({ pageIndex, pageSize, sortDir }),
    placeholderData: keepPreviousData,
  });
}
