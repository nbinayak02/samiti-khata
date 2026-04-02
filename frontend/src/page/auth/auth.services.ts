import axiosInstance from "@/lib/apiClient"
import type { TLoginFormData, TSignupFormData } from "./auth.schema"

export const signup = async (data: TSignupFormData) => {
  return await axiosInstance.post("/auth/signup", data)
}

export const login = async (data: TLoginFormData) => {
  return await axiosInstance.post("/auth/login", data)
}

export const refreshToken = async () => {
  return await axiosInstance.post("/auth/refresh");
}
