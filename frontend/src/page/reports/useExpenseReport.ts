import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useQuery } from "@tanstack/react-query"
import ExpenseRepository from "../expense/expense.repository"
import { useEffect } from "react"
import {
  selectExpenseReportStates,
  setCurrentPage,
  setDownloading,
  setPageSize,
  setTotalPages,
} from "./expense.report.slice"
import { toast } from "sonner"

const useExpenseReport = () => {
  const expenseStates = useAppSelector(selectExpenseReportStates)
  const dispatch = useAppDispatch()

  const searchParameters = {
    ...expenseStates,
    currentPage: String(expenseStates.currentPage),
    pageSize: String(expenseStates.pageSize),
  }

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["expenses", searchParameters],
    queryFn: () => ExpenseRepository.search(searchParameters),
  })

  // update total pages, current page and page size in the store when incomeResponse changes
  useEffect(() => {
    if (!data) return
    dispatch(setTotalPages(data?.totalPages))
    dispatch(setCurrentPage(data?.pageNumber))
    dispatch(setPageSize(data?.pageSize))
  }, [data, dispatch])

  const handleDownload = async () => {
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
    } catch (error) {
      toast.error("Something went wrong while downloading")
    } finally {
      dispatch(setDownloading(false))
    }
  }

  return { searchResult: data, isSuccess, isPending, handleDownload }
}

export default useExpenseReport
