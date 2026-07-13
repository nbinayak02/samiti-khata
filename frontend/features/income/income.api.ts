import { axiosInstance } from "@/lib/api/browser.client";
import { BackendResponse } from "../shared.types";
import { AddIncomeOutput } from "./addIncome.schema";

export async function addIncome(
  income: AddIncomeOutput,
): Promise<BackendResponse<AddIncomeOutput>> {
  return await axiosInstance.post("/income", income);
}
