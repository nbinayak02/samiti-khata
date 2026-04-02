import axiosInstance from "@/lib/apiClient"
import type { TCreateCommittee } from "./schema"
import type { TCommittee } from "./committee.types"

const committeeRepository = {
  create: async (data: TCreateCommittee) => {
    return await axiosInstance.post("/committee", data)
  },
  fetchAllByOrganization: async (): Promise<TCommittee[]> => {
    const response = await axiosInstance.get("/committee/")
    return response.data.data
  },
}

export default committeeRepository
