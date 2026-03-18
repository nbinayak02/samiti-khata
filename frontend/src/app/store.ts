import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/slice/authSlice"
import committeeReducer from "../features/committee/committee.slice"

// create the global, centralized store for the app
export const store = configureStore({
  // define reducers
  reducer: {
    auth: authReducer,
    committee: committeeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
