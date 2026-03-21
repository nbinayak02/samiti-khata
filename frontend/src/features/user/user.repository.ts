import axiosInstance from "@/lib/apiClient"
import type { TApproveUserPayload } from "./user.types"

export const userRepository = {
  fetchAllAdmins: async () => {
    return axiosInstance.get("/user/admin/")
  },
  fetchAllOperators: async () => {
    return axiosInstance.get("/user/operator/")
  },
  fetchBillIssuers: async () => {
    return axiosInstance.get("/bill-issuer/")
  },
  approveAdmin: async (payload: TApproveUserPayload) => {
    return axiosInstance.post(`/user/approve-admin/`, payload)
  },
}
