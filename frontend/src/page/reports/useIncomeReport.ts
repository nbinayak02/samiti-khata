import { useQuery } from "@tanstack/react-query"
import IncomeRepository from "../income/income.repository"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useEffect } from "react"
import {
  selectIncomeReportStates,
  setCurrentPage,
  setPageSize,
  setTotalPages,
} from "./income.report.slice"

const useIncomeReport = () => {
  const incomeStates = useAppSelector(selectIncomeReportStates)

  const dispatch = useAppDispatch()

  const searchParameters = {
    ...incomeStates,
    currentPage: String(incomeStates.currentPage),
    pageSize: String(incomeStates.pageSize),
  }

  const {
    data: searchResult,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ["incomes", incomeStates],
    queryFn: () => IncomeRepository.search(searchParameters),
  })

  // update total pages, current page and page size in the store when incomeResponse changes
  useEffect(() => {
    if (!searchResult) return
    dispatch(setTotalPages(searchResult.totalPages))
    dispatch(setCurrentPage(searchResult.pageNumber))
    dispatch(setPageSize(searchResult.pageSize))
  }, [searchResult, dispatch])

  return { searchResult, isSuccess, isPending }
}
export default useIncomeReport
