import { createSelector, createSlice } from "@reduxjs/toolkit"
import type {
  EExpenseReportReducer,
  TExpenseReportInitialState,
} from "./report.type"
import type { RootState } from "@/app/store"

const initialState: TExpenseReportInitialState = {
  committeeId: "",
  categoryId: "",
  documentType: "",
  paymentMode: "",
  name: "",
  address: "",
  fromDate: "",
  toDate: "",
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  isDownloading: false,
}

const expenseReportSlice = createSlice({
  name: "expenseReport",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filterType: EExpenseReportReducer = action.payload.filterType
      state[filterType] = action.payload.value
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setCurrentPage: (state, action) => {
      // console.log("Setting current page:", action.payload)
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setDownloading: (state, action) => {
      state.isDownloading = action.payload
    },
    clearFilter: (state, action) => {
      const filterType: EExpenseReportReducer = action.payload.filterType
      state[filterType] = ""
    },
    clearAllExpenseFilters: (state) => {
      state.committeeId = ""
      state.categoryId = ""
      state.documentType = ""
      state.paymentMode = ""
      state.name = ""
      state.address = ""
      state.fromDate = ""
      state.toDate = ""
    },
  },
})

const selectExpenseState = (state: RootState) => state.expenseReport

export const selectExpenseReportStates = createSelector(
  [selectExpenseState],
  (expenseReportState) => ({
    committeeId: expenseReportState.committeeId,
    categoryId: expenseReportState.categoryId,
    documentType: expenseReportState.documentType,
    paymentMode: expenseReportState.paymentMode,
    name: expenseReportState.name,
    address: expenseReportState.address,
    fromDate: expenseReportState.fromDate,
    toDate: expenseReportState.toDate,
    currentPage: expenseReportState.currentPage,
    pageSize: expenseReportState.pageSize,
    totalPages: expenseReportState.totalPages,
  })
)

export const {
  setFilter,
  clearFilter,
  clearAllExpenseFilters,
  setCurrentPage,
  setPageSize,
  setTotalPages,
  setDownloading,
} = expenseReportSlice.actions

export default expenseReportSlice.reducer
