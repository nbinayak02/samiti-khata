import axiosInstance from "@/lib/axios";
import type { OrganizationSchema } from "../schemas/organization.schema";

export async function createOrganization(data: OrganizationSchema) {
  const response = await axiosInstance.post(`/organization`, data);
  return response.data.data;
}
