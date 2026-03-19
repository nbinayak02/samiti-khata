import axiosInstance from "@/lib/apiClient"

export const userRepository = {
  fetchUsers: async () => {
    return axiosInstance.get("/user/")
  },
  fetchBillIssuers: async () => {
    return axiosInstance.get("/bill-issuer/")
  },
}
