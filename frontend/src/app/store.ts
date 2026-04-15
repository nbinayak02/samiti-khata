import { configureStore } from "@reduxjs/toolkit"
import userReducer from "@/page/user/user.slice"
import authReducer from "@/page/auth/auth.slice"
import incomeReportReducer from "@/page/reports/income.report.slice"
import expenseReportReducer from "@/page/reports/expense.report.slice"
import organizationReducer from "@/page/organization/organization.slice"

// create the global, centralized store for the app
export const store = configureStore({
  // define reducers
  reducer: {
    auth: authReducer,
    user: userReducer,
    organization: organizationReducer,
    incomeReport: incomeReportReducer,
    expenseReport: expenseReportReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
