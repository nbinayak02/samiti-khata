import axiosInstance from "@/lib/apiClient"
import type { TIncomeFormData } from "./income.schema"
import type { TIncome, TIncomeResponse } from "./income.types"
import type { TIncomeReportInitialState } from "../reports/report.type"

const IncomeRepository = {
  create: async (data: TIncomeFormData) => {
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
}
export default IncomeRepository
