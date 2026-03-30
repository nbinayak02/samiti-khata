import axiosInstance from "@/lib/apiClient"
import type { TApproveUserPayload, TUser } from "./user.types"

export const userRepository = {
  fetchAllAdmins: async () => {
    return axiosInstance.get("/user/admin/")
  },
  fetchAllOperators: async (): Promise<TUser[]> => {
    const response = await axiosInstance.get("/user/operator/")
    return response.data.data
  },
  fetchBillIssuers: async () => {
    return axiosInstance.get("/bill-issuer/")
  },
  approveAdmin: async (payload: TApproveUserPayload) => {
    return axiosInstance.post(`/user/approve-admin/`, payload)
  },
  approveOperator: async (operatorId: number) => {
    return axiosInstance.post(`/user/approve-operator/${operatorId}/`)
  },
}
