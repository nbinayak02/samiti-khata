import { MODULES } from "@/constants/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedQueryString } from "@/types/pagination.types";
import { getOrgMembers } from "../api/orgMember.api";

export default function useGetOrgMembers(
  { pageIndex = 1, pageSize = 25, sortDir = "desc" }: PaginatedQueryString = {
    pageIndex: 1,
    pageSize: 25,
  },
) {
  return useQuery({
    queryKey: [MODULES.ORG_MEMBERS, "page", pageIndex, pageSize, sortDir],
    queryFn: () => getOrgMembers({ pageIndex, pageSize, sortDir }),
    placeholderData: keepPreviousData,
  });
}
