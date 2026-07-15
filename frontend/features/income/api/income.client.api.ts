import { axiosInstance } from "@/lib/api/browser.client";
import { AddIncomeOutput } from "../addIncome.schema";
import { BackendResponse } from "@/features/shared.types";

export async function addIncome(
  income: AddIncomeOutput,
): Promise<BackendResponse<AddIncomeOutput>> {
  return await axiosInstance.post("/income", income);
}
