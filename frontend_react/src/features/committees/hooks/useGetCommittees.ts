import { MODULES } from "@/constants/constants";
import { getCommittees } from "../api/committee.api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedQueryString } from "@/types/pagination.types";

export default function useGetCommittees({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString) {
  return useQuery({
    queryKey: [MODULES.COMMITTEE, "page", pageIndex, pageSize, sortDir],
    queryFn: () => getCommittees({ pageIndex, pageSize, sortDir }),
    placeholderData: keepPreviousData,
  });
}
