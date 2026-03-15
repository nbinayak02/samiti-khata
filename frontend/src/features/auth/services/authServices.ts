import axiosInstance from "@/lib/apiClient"
import type { TLoginFormData, TSignupFormData } from "../model/schema"

export const signup = async (data: TSignupFormData) => {
  return await axiosInstance.post("/user/signup", data)
}

export const login = async (data: TLoginFormData) => {
  return await axiosInstance.post("/user/login", data)
}
