import axiosInstance from "@/lib/apiClient"

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
}
