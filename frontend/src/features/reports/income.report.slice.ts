import { createSlice } from "@reduxjs/toolkit"
import type {
  EIncomeReportReducer,
  TIncomeReportInitialState,
} from "./report.type"

const initialState: TIncomeReportInitialState = {
  isSearchByDocument: "",
  committeeId: "",
  billNumber: "",
  bookNumber: "",
  name: "",
  fromDate: "",
  toDate: "",
  billIssuerId: "",
}

const incomeReportSlice = createSlice({
  name: "incomeReport",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const filterType: EIncomeReportReducer = action.payload.filterType
      state[filterType] = action.payload.value
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

export const { setFilter, clearFilter, clearAllFilters } =
  incomeReportSlice.actions

export default incomeReportSlice.reducer
