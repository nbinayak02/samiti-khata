import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/user.slice"
import authReducer from "../features/auth/slice/authSlice"
import committeeReducer from "../features/committee/committee.slice"
import incomeReportReducer from "../features/reports/income.report.slice"
import expenseReportReducer from "../features/reports/expense.report.slice"
import organizationReducer from "../features/organization/organization.slice"

// create the global, centralized store for the app
export const store = configureStore({
  // define reducers
  reducer: {
    auth: authReducer,
    user: userReducer,
    committee: committeeReducer,
    organization: organizationReducer,
    incomeReport: incomeReportReducer,
    expenseReport: expenseReportReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
