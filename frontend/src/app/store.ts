import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/slice/authSlice"

// create the global, centralized store for the app
export const store = configureStore({
  // define reducers
  reducer: {
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch