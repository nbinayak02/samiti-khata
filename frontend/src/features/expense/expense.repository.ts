import axiosInstance from "@/lib/apiClient"
import type { TCreateExpense, TExpense, TExpenseResponse } from "./expense.types"
import type { TExpenseReportInitialState } from "../reports/report.type"

const ExpenseRepository = {
  create: async (data: TCreateExpense) => {
    await axiosInstance.post("/expense", data)
  },

  getRecentExpense: async (): Promise<TExpense[]> => {
    const response = await axiosInstance.get("/expense/recent")
    return response.data.data
  },

  search: async (
    data: Omit<
      TExpenseReportInitialState,
      "totalPages" | "currentPage" | "pageSize"
    > & { currentPage: string; pageSize: string }
  ): Promise<TExpenseResponse> => {
    // generate query params from data object
    const queryParams = new URLSearchParams(data).toString()
    const response = await axiosInstance.get(`report/expense?${queryParams}`)
    return response.data
  },
}
export default ExpenseRepository
