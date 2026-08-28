import axiosInstance from "@/lib/axios";
import type { OrgMemberSchema } from "../schemas/orgMember.schema";
import type { OrgMember } from "../types/orgMember.types";
import type { PaginatedQueryString } from "@/types/pagination.types";
import type { APIResponsePaginated } from "@/types/apiResponse.types";

export async function createOrgMember(data: OrgMemberSchema) {
  const response = await axiosInstance.post(`/authorized-org-member`, data);
  return response.data.data;
}

export async function getOrgMembers({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString): Promise<APIResponsePaginated<OrgMember[]>> {
  const response = await axiosInstance.get(
    `/authorized-org-member?pageSize=${pageSize}&pageIndex=${pageIndex}&sortDir=${sortDir}`,
  );
  return response.data;
}
