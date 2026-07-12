import { IncomeDto } from "@/api/types";

export function addIncome(income: IncomeDto): Promise<IncomeDto> {
  return Promise.resolve({ ...income });
}
