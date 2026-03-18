import axiosInstance from "@/lib/apiClient"
import type { TCreateCommittee } from "../model/schema"

export const committeeService = {
  create: async (data: TCreateCommittee) => {
    return await axiosInstance.post("/committee", data)
  },
  fetchAll: async () => {
    return await axiosInstance.get("/committee/")
  },
}
