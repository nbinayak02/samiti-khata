import { MODULES } from "@/constants/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedQueryString } from "@/types/pagination.types";
import { getAllSubCommittees } from "../api/committee.api";

export default function useGetSubCommittees({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString) {
  return useQuery({
    queryKey: [MODULES.SUB_COMMITTEE, "page", pageIndex, pageSize, sortDir],
    queryFn: () => getAllSubCommittees({ pageIndex, pageSize, sortDir }),
    placeholderData: keepPreviousData,
  });
}
