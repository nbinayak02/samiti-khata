import axiosInstance from "@/lib/apiClient"
import type { TIncomeFormData } from "./income.schema"
import type { TIncome } from "./income.types"

const IncomeRepository = {
  create: async (data: TIncomeFormData) => {
    await axiosInstance.post("/incomes", data)
  },

  getIncomesByOrganization: async (): Promise<TIncome[]> => {
    const response = await axiosInstance.get("/incomes/organization")
    return response.data.data
  },
}
export default IncomeRepository
