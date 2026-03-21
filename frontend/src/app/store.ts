import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/user.slice"
import authReducer from "../features/auth/slice/authSlice"
import committeeReducer from "../features/committee/committee.slice"
import organizationReducer from "../features/organization/organization.slice"

// create the global, centralized store for the app
export const store = configureStore({
  // define reducers
  reducer: {
    auth: authReducer,
    user: userReducer,
    committee: committeeReducer,
    organization: organizationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
