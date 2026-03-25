import axiosInstance from "@/lib/apiClient"
import type { TIncomeReportInitialState } from "./report.type"
import type { TIncome } from "../income/income.types"

const ReportRepository = {
  search: async (data: TIncomeReportInitialState): Promise<TIncome[]> => {
    // generate query params from data object
    const queryParams = new URLSearchParams(data).toString()
    const response = await axiosInstance.get(`report/income?${queryParams}`)
    return response.data.data
  },
}
export default ReportRepository
