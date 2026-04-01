import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useQuery } from "@tanstack/react-query"
import ExpenseRepository from "../expense/expense.repository"
import { useEffect } from "react"
import {
  setCurrentPage,
  setDownloading,
  setPageSize,
  setTotalPages,
} from "./expense.report.slice"
import { toast } from "sonner"

const useExpenseReport = () => {
  const filterCommitteeId = useAppSelector(
    (state) => state.expenseReport.committeeId
  )
  const filterCategoryId = useAppSelector(
    (state) => state.expenseReport.categoryId
  )
  const filterDocumentType = useAppSelector(
    (state) => state.expenseReport.documentType
  )
  const filterPaymentMode = useAppSelector(
    (state) => state.expenseReport.paymentMode
  )

  const filterName = useAppSelector((state) => state.expenseReport.name)
  const filterAddress = useAppSelector((state) => state.expenseReport.address)
  const filterFromDate = useAppSelector((state) => state.expenseReport.fromDate)
  const filterToDate = useAppSelector((state) => state.expenseReport.toDate)
  const currentPage = useAppSelector((state) => state.expenseReport.currentPage)
  const pageSize = useAppSelector((state) => state.expenseReport.pageSize)
  const dispatch = useAppDispatch()

  const searchParameters = {
    committeeId: filterCommitteeId,
    name: filterName,
    address: filterAddress,
    categoryId: filterCategoryId,
    documentType: filterDocumentType,
    paymentMode: filterPaymentMode,
    fromDate: filterFromDate,
    toDate: filterToDate,
    currentPage: String(currentPage),
    pageSize: String(pageSize),
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
