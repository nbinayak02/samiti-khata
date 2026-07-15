import { axiosInstance } from "@/lib/api/browser.client";
import { FiscalYearSchema } from "@/features/fiscal-year/fiscalYear.schema";

export async function getFiscalYears(): Promise<
  FiscalYearSchema & { id: number; name: string }[]
> {
  const response = await axiosInstance.get("/fiscal-year");
  console.log({ response: response.data.data });
  return response.data.data;
}
