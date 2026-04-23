import { createSelector, createSlice } from "@reduxjs/toolkit"
import type {
  EIncomeReportReducer,
  TIncomeReportInitialState,
} from "./report.type"
import type { RootState } from "@/app/store"

const initialState: TIncomeReportInitialState = {
  committeeId: "",
  billNumber: "",
  bookNumber: "",
  name: "",
  address:"",
  fromDate: "",
  toDate: "",
  billIssuerId: "",
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  isDownloading: false,
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
      // console.log(
      //   "Setting current page:",
      //   action.payload,
      //   " from: ",
      //   action.type
      // )
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },

    setDownloading: (state, action) => {
      state.isDownloading = action.payload
    },
    clearFilter: (state, action) => {
      const filterType: EIncomeReportReducer = action.payload.filterType
      state[filterType] = ""
    },
    clearAllFilters: (state) => {
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
    committeeId: state.committeeId,
    billNumber: state.billNumber,
    bookNumber: state.bookNumber,
    name: state.name,
    address: state.address,
    fromDate: state.fromDate,
    toDate: state.toDate,
    billIssuerId: state.billIssuerId,
    currentPage: state.currentPage,
    pageSize: state.pageSize,
  })
)

export const {
  setFilter,
  clearFilter,
  clearAllFilters,
  setCurrentPage,
  setPageSize,
  setTotalPages,
  setDownloading,
} = incomeReportSlice.actions

export default incomeReportSlice.reducer
