import axiosInstance from "@/lib/axios";
import type { OrgMemberSchema } from "../schemas/orgMember.schema";
import type { OrgMember } from "../types/orgMember.types";

export async function createOrgMember(data: OrgMemberSchema) {
  const response = await axiosInstance.post(`/authorized-org-member`, data);
  return response.data.data;
}

export async function getOrgMembers(): Promise<OrgMember[]> {
  const response = await axiosInstance.get(`/authorized-org-member`);
  return response.data.data;
}
