import { useQuery } from "@tanstack/react-query"
import IncomeRepository from "../income/income.repository"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useEffect } from "react"
import {
  setCurrentPage,
  setPageSize,
  setTotalPages,
} from "./income.report.slice"

const useIncomeReport = () => {
  const filterCommitteeId = useAppSelector(
    (state) => state.incomeReport.committeeId
  )

  const filterName = useAppSelector((state) => state.incomeReport.name)
  const filterBillNumber = useAppSelector(
    (state) => state.incomeReport.billNumber
  )
  const filterBookNumber = useAppSelector(
    (state) => state.incomeReport.bookNumber
  )
  const filterFromDate = useAppSelector((state) => state.incomeReport.fromDate)
  const filterToDate = useAppSelector((state) => state.incomeReport.toDate)
  const filterBillIssuerId = useAppSelector(
    (state) => state.incomeReport.billIssuerId
  )

  const currentPage = useAppSelector((state) => state.incomeReport.currentPage)
  const pageSize = useAppSelector((state) => state.incomeReport.pageSize)
  const searchType = useAppSelector((state) => state.incomeReport.searchType)
  const dispatch = useAppDispatch()

  const searchParameters = {
    isSearchByDocument: String(searchType === "document"),
    committeeId: filterCommitteeId,
    name: filterName,
    billNumber: filterBillNumber,
    bookNumber: filterBookNumber,
    fromDate: filterFromDate,
    toDate: filterToDate,
    billIssuerId: filterBillIssuerId,
    currentPage: String(currentPage),
    pageSize: String(pageSize),
  }

  const {
    data: searchResult,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey: ["incomes", searchParameters],
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
