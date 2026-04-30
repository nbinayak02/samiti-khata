import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import {
  selectExpenseReportStates,
  setDownloading,
} from "./expense.report.slice"
import ExpenseRepository from "../expense/expense.repository"
import { toast } from "sonner"

export type DownloadReportProps = {
  range: "current" | "all"
}

const useDownloadExpenseReport = () => {
  const expenseStates = useAppSelector(selectExpenseReportStates)
  const dispatch = useAppDispatch()

  const downloadExpenseReport = async ({ range }: DownloadReportProps) => {
    // if range is all, set current page to -1 to indicate backend to ignore pagination
    const searchParameters = {
      ...expenseStates,
      currentPage: range === "all" ? "-1" : String(expenseStates.currentPage),
      pageSize: String(expenseStates.pageSize),
    }

    try {
      dispatch(setDownloading(true))
      const blobData = await ExpenseRepository.export(searchParameters)
      const url = window.URL.createObjectURL(new Blob([blobData]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "expense_report.xlsx")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch {
      toast.error("Something went wrong while downloading")
    } finally {
      dispatch(setDownloading(false))
    }
  }
  return { downloadExpenseReport }
}

export default useDownloadExpenseReport
