import axiosInstance from "@/lib/apiClient"
import type { TCreateExpense, TExpense } from "./expense.types"

const ExpenseRepository = {
  create: async (data: TCreateExpense) => {
    await axiosInstance.post("/expense", data)
  },

  getRecentExpense: async (): Promise<TExpense[]> => {
    const response = await axiosInstance.get("/expense/recent")
    return response.data.data
  },
}
export default ExpenseRepository
