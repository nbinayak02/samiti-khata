import axiosInstance from "@/lib/axios";
import type { LoginSchema } from "../schemas/login.schema";

export async function login(data: LoginSchema) {
  const response = await axiosInstance.post(`/auth/login`, data);
  return response.data.data;
}

export async function me() {
  
}