import axiosInstance from "@/lib/axios";
import type { FiscalYearSchema } from "../schemas/fiscal-year.schema";

export async function createFiscalYear(data: FiscalYearSchema) {
  const response = await axiosInstance.post(`/fiscal-year`, data);
  return await response.data.data;
}
