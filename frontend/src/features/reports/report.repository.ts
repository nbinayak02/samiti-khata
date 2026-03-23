import axiosInstance from "@/lib/apiClient"
import type { TSearchFormWithoutDocumentFlag } from "./report.type"

const ReportRepository = {
  search: async (data: TSearchFormWithoutDocumentFlag) => {
    // generate query params from data object
    const queryParams = new URLSearchParams(data).toString()
    const response = await axiosInstance.get(`report/income?${queryParams}`)
    return response.data.data
  },
}
export default ReportRepository
