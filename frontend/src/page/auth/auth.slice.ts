import type { TAuthState } from "./auth.types"
import { login } from "./auth.services"
import type { TLoginFormData } from "./auth.schema"
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"

// the default value of the auth state
const initialState: TAuthState = {
  name: null,
  email: null,
  role: "",
  token: null,
  status: "idle",
  isAuthenticated: false,
}

// async thunk action for logging in the user
export const logInUser = createAsyncThunk<
  TAuthState, // return type
  TLoginFormData, // argument type
  { rejectValue: string } // reject value type
>("auth/logInUser", async (data: TLoginFormData, { rejectWithValue }) => {
  try {
    const response = await login(data)
    console.log("Login response:", response)
    return response.data.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error?.message || "Login failed")
  }
})

const selectAuthState = (state: RootState) => state.auth

// selector to get user authentication info so we don't have
// to select each field separately in components

export const selectUserAuthInfo = createSelector(
  [selectAuthState],
  (state) => ({
    name: state.name,
    email: state.email,
    role: state.role,
    token: state.token,
  })
)

// auth slice
const authSlice = createSlice({
  // name of slice
  name: "auth",

  // initial state
  initialState,

  // reducer functions
  reducers: {
    // in case we want to set user auth info manually without going through the async thunk
    setUserAuthInfo: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.role = action.payload.role
      state.token = action.payload.token
      state.isAuthenticated = true
    },

    // log out reducer function
    setUserLogOut: (state) => {
      state.name = null
      state.email = null
      state.role = ""
      state.token = null
      state.status = "idle"
      state.isAuthenticated = false
    },
  },

  // extra reducers for handling async actions
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.pending, (state) => {
        state.status = "pending"
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.status = "success"
        state.isAuthenticated = true
        state.name = action.payload.name
        state.email = action.payload.email
        state.role = action.payload.role
        state.token = action.payload.token
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.status = "error"
        state.errorMessage = action.payload ?? "Login failed"
      })
  },
})

export const { setUserAuthInfo, setUserLogOut } = authSlice.actions
export default authSlice.reducer
