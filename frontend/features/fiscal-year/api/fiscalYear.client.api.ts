import { FiscalYearSchema } from "../fiscalYear.schema";
import { axiosInstance } from "@/lib/api/browser.client";
import { BackendResponse } from "@/features/shared.types";

type GetFiscalYears = FiscalYearSchema & {
  id: number;
  name: string;
};

export async function addFiscalYear(
  fiscalYear: FiscalYearSchema,
): Promise<BackendResponse<FiscalYearSchema>> {
  return await axiosInstance.post("/fiscal-year", fiscalYear);
}

export async function getFiscalYears(): Promise<GetFiscalYears[]> {
  const response = await axiosInstance.get("/fiscal-year");
  return response.data.data;
}
