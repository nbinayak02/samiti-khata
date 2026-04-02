import { createSelector, createSlice } from "@reduxjs/toolkit"
import type {
  EIncomeReportReducer,
  TIncomeReportInitialState,
} from "./report.type"
import type { RootState } from "@/app/store"

const initialState: TIncomeReportInitialState = {
  isSearchByDocument: "",
  committeeId: "",
  billNumber: "",
  bookNumber: "",
  name: "",
  fromDate: "",
  toDate: "",
  billIssuerId: "",
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  searchType: "document",
}

const incomeReportSlice = createSlice({
  name: "incomeReport",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filterType: EIncomeReportReducer = action.payload.filterType
      state[filterType] = action.payload.value
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setCurrentPage: (state, action) => {
      console.log("Setting current page:", action.payload)
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload
    },
    clearFilter: (state, action) => {
      const filterType: EIncomeReportReducer = action.payload.filterType
      state[filterType] = ""
    },
    clearAllFilters: (state) => {
      state.isSearchByDocument = ""
      state.committeeId = ""
      state.billNumber = ""
      state.bookNumber = ""
      state.name = ""
      state.fromDate = ""
      state.toDate = ""
      state.billIssuerId = ""
    },
  },
})

const selectIncomeStates = (state: RootState) => state.incomeReport

// selector to get user authentication info so we don't have
// to select each field separately in components

export const selectIncomeReportStates = createSelector(
  [selectIncomeStates],
  (state) => ({
    isSearchByDocument: state.isSearchByDocument,
    committeeId: state.committeeId,
    billNumber: state.billNumber,
    bookNumber: state.bookNumber,
    name: state.name,
    fromDate: state.fromDate,
    toDate: state.toDate,
    billIssuerId: state.billIssuerId,
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    pageSize: state.pageSize,
    searchType: state.searchType === "document",
  })
)

export const {
  setFilter,
  clearFilter,
  clearAllFilters,
  setCurrentPage,
  setPageSize,
  setTotalPages,
  setSearchType,
} = incomeReportSlice.actions

export default incomeReportSlice.reducer
