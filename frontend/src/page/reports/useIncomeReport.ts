import { useQuery } from "@tanstack/react-query"
import IncomeRepository from "../income/income.repository"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useEffect } from "react"
import {
  selectIncomeReportStates,
  setCurrentIncomePage,
  setIncomePageSize,
  setTotalIncomePages,
} from "./income.report.slice"

const useIncomeReport = () => {
  const incomeStates = useAppSelector(selectIncomeReportStates)

  const dispatch = useAppDispatch()

  const searchParameters = {
    ...incomeStates,
    currentPage: String(incomeStates.currentPage),
    pageSize: String(incomeStates.pageSize),
  }

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["incomes", incomeStates],
    queryFn: () => IncomeRepository.search(searchParameters),
  })

  // update total pages, current page and page size in the store when incomeResponse changes
  useEffect(() => {
    if (!data) return
    dispatch(setTotalIncomePages(data.totalPages))
    dispatch(setCurrentIncomePage(data.pageNumber))
    dispatch(setIncomePageSize(data.pageSize))
  }, [data, dispatch])

  return {
    data,
    isIncomeSearchSuccess: isSuccess,
    isIncomeSearchPending: isPending,
  }
}
export default useIncomeReport
