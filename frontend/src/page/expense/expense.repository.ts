import axiosInstance from "@/lib/apiClient"
import type {
  TCreateExpense,
  TExpense,
  TExpenseResponse,
} from "./expense.types"
import type { TExpenseReportInitialState } from "../reports/report.type"
import type { TExpenseFormData } from "./expense.schema"

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
      "totalPages" | "currentPage" | "pageSize" | "isDownloading"
    > & { currentPage: string; pageSize: string }
  ): Promise<TExpenseResponse> => {
    // generate query params from data object
    const queryParams = new URLSearchParams(data).toString()
    const response = await axiosInstance.get(`report/expense?${queryParams}`)
    return response.data
  },

  export: async (
    data: Omit<
      TExpenseReportInitialState,
      "totalPages" | "currentPage" | "pageSize" | "isDownloading"
    > & { currentPage: string; pageSize: string }
  ) => {
    // generate query params from data object
    const queryParams = new URLSearchParams(data).toString()
    const response = await axiosInstance.get(
      `report/expense/download?${queryParams}`,
      {
        responseType: "blob",
      }
    )
    return response.data
  },

  getById: async (id: number): Promise<{ data: TExpense; message: string }> => {
    const response = await axiosInstance.get(`/expense/${id}`)
    return response.data
  },

   update: async (data: TExpenseFormData) => {
    const id = data.id
    delete data.id
    const response = await axiosInstance.put(`/expense/${id}`, data)
    return response.data
  },
}
export default ExpenseRepository
