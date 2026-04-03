import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useQuery } from "@tanstack/react-query"
import ExpenseRepository from "../expense/expense.repository"
import { useEffect } from "react"
import {
  selectExpenseReportStates,
  setCurrentPage,
  setPageSize,
  setTotalPages,
} from "./expense.report.slice"

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

  return { searchResult: data, isSuccess, isPending }
}

export default useExpenseReport
