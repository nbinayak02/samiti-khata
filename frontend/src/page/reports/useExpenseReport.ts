import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useQuery } from "@tanstack/react-query"
import ExpenseRepository from "../expense/expense.repository"
import { useEffect } from "react"
import {
  selectExpenseReportStates,
  setCurrentExpensePage,
  setExpensePageSize,
  setTotalExpensePages,
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
    dispatch(setTotalExpensePages(data?.totalPages))
    dispatch(setCurrentExpensePage(data?.pageNumber))
    dispatch(setExpensePageSize(data?.pageSize))
  }, [data, dispatch])

  return { data, isExpenseSearchSuccess:isSuccess, isExpenseSearchPending:isPending }
}

export default useExpenseReport
