import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { selectIncomeReportStates, setDownloading } from "./income.report.slice"
import IncomeRepository from "../income/income.repository"
import { toast } from "sonner"

export type DownloadReportProps = {
  range: "current" | "all"
}

const useDownloadIncomeReport = () => {
  const incomeStates = useAppSelector(selectIncomeReportStates)
  const dispatch = useAppDispatch()

  const downloadIncomeReport = async ({ range }: DownloadReportProps) => {
    const searchParameters = {
      ...incomeStates,
      currentPage: range === "all" ? "-1" : String(incomeStates.currentPage),
      pageSize: String(incomeStates.pageSize),
    }

    try {
      dispatch(setDownloading(true))
      const blobData = await IncomeRepository.export(searchParameters)
      const url = window.URL.createObjectURL(new Blob([blobData]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "income_report.xlsx")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast.error("Something went wrong while downloading")
    } finally {
      dispatch(setDownloading(false))
    }
  }

  return { downloadIncomeReport }
}

export default useDownloadIncomeReport
