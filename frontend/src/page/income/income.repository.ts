import axiosInstance from "@/lib/apiClient"
import type { TIncome, TIncomeResponse } from "./income.types"
import type { TIncomeReportInitialState } from "../reports/report.type"
import type { TIncomeAddForm } from "./income.schema"

const IncomeRepository = {
  create: async (data: TIncomeAddForm) => {
    await axiosInstance.post("/income", data)
  },

  getRecentIncome: async (): Promise<TIncome[]> => {
    const response = await axiosInstance.get("/income/recent")
    return response.data.data
  },

  search: async (
    data: Omit<
      TIncomeReportInitialState,
      "totalPages" | "currentPage" | "pageSize" | "isDownloading"
    > & { currentPage: string; pageSize: string }
  ): Promise<TIncomeResponse> => {
    // generate query params from data object
    const queryParams = new URLSearchParams(data).toString()
    const response = await axiosInstance.get(`report/income?${queryParams}`)
    return response.data
  },

  export: async (
    data: Omit<
      TIncomeReportInitialState,
      "totalPages" | "currentPage" | "pageSize" | "isDownloading" | "searchType"
    > & { currentPage: string; pageSize: string }
  ) => {
    // generate query params from data object
    const queryParams = new URLSearchParams(data).toString()
    const response = await axiosInstance.get(
      `report/income/download?${queryParams}`,
      {
        responseType: "blob",
      }
    )
    return response.data
  },

  getById: async (id: number): Promise<{ data: TIncome; message: string }> => {
    const response = await axiosInstance.get(`/income/${id}`)
    return response.data
  },

  update: async (data: TIncomeAddForm) => {
    const id = data.id
    delete data.id
    const response = await axiosInstance.put(`/income/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    await axiosInstance.patch(`/income/archive/${id}`)
  },
}
export default IncomeRepository
