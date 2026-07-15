import { FiscalYearSchema } from "../fiscalYear.schema";
import { axiosInstance } from "@/lib/api/browser.client";
import { BackendResponse } from "@/features/shared.types";

export async function addFiscalYear(
  fiscalYear: FiscalYearSchema,
): Promise<BackendResponse<FiscalYearSchema>> {
  return await axiosInstance.post("/fiscal-year", fiscalYear);
}

export async function getFiscalYears(): Promise<
  FiscalYearSchema & { id: number; name: string }[]
> {
  const response = await axiosInstance.get("/fiscal-year");
  return response.data.data;
}
