import axiosInstance from "@/lib/apiClient"
import type { TIncomeFormData } from "./income.schema"
import type { TIncome } from "./income.types"

const IncomeRepository = {
  create: async (data: TIncomeFormData) => {
    await axiosInstance.post("/income", data)
  },

  getRecentIncome: async (): Promise<TIncome[]> => {
    const response = await axiosInstance.get("/income/recent")
    return response.data.data
  },
}
export default IncomeRepository
