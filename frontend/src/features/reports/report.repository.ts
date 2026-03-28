import axiosInstance from "@/lib/apiClient"
import type { TIncomeReportInitialState } from "./report.type"
import type { TIncomeResponse } from "../income/income.types"

const ReportRepository = {
  search: async (
    data: Omit<
      TIncomeReportInitialState,
      "totalPages" | "currentPage" | "pageSize"
    > & { currentPage: string; pageSize: string }
  ): Promise<TIncomeResponse> => {
    // generate query params from data object
    const queryParams = new URLSearchParams(data).toString()
    const response = await axiosInstance.get(`report/income?${queryParams}`)
    return response.data
  },
}
export default ReportRepository
