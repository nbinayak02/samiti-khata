import axiosInstance from "@/lib/apiClient"
import type { TCreateCommittee } from "../model/schema"

export const createCommittee = async (data: TCreateCommittee) => {
  return await axiosInstance.post("/committees", data)
}
