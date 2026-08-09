import axiosInstance from "@/lib/axios";
import type { CreateIncomeSchema } from "../schemas/income.schema";

export async function createIncome(data: CreateIncomeSchema) {
  const response = await axiosInstance.post(`/income`, data);
  return response.data.data;
}
