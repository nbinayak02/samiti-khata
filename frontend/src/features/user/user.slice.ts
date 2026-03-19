import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { TUser, TUserState, TBillIssuer } from "./user.types"
import { userRepository } from "./user.repository"
import type { AxiosError } from "axios"

const initialState: TUserState = {
  data: [],
  status: "idle",
  errorMessage: null,
}

// fetch users
export const fetchUsers = createAsyncThunk<
  TUser[],
  void,
  { rejectValue: string }
>("user/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await userRepository.fetchUsers()
    return response.data.data
  } catch (error: AxiosError | any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch users"
    )
  }
})

// fetch bill issuers
export const fetchBillIssuers = createAsyncThunk<
  TBillIssuer[],
  void,
  { rejectValue: string }
>("user/fetchBillIssuers", async (_, { rejectWithValue }) => {
  try {
    const response = await userRepository.fetchBillIssuers()
    return response.data.data
  } catch (error: AxiosError | any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch bill issuers"
    )
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"
        state.errorMessage = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.errorMessage = null
        state.data = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"
        state.errorMessage = action.payload ?? "Failed to fetch users"
      })
    // fetch bill issuers
    builder
      .addCase(fetchBillIssuers.pending, (state) => {
        state.status = "loading"
        state.errorMessage = null
      })
      .addCase(fetchBillIssuers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.errorMessage = null
        // state.data = action.payload
      })
      .addCase(fetchBillIssuers.rejected, (state, action) => {
        state.status = "failed"
        state.errorMessage = action.payload ?? "Failed to fetch bill issuers"
      })
  },
})

export default userSlice.reducer
