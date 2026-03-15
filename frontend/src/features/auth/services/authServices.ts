import axiosInstance from "@/lib/apiClient"
import type { TSignupFormData } from "../model/schema"

export const signup = async (data: TSignupFormData) => {
  return await axiosInstance.post("/user/signup", data)
}
