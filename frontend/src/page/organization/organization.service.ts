import axiosInstance from "@/lib/apiClient"
import type { TCreateOrganization } from "./organization.schema"

export const organizationService = {
  create: async (data: TCreateOrganization) => {
    return await axiosInstance.post("/organization", data)
  },

  fetch: async () => {
    return await axiosInstance.get(`/organization/`)
  },

  fetchUserAssigned: async () => {
    return await axiosInstance.get(`/organization/user-assigned/`)
  },
}
