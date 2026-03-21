import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
  TUser,
  TUserState,
  TBillIssuer,
  TApproveUserPayload,
} from "./user.types"
import { userRepository } from "./user.repository"
import type { AxiosError } from "axios"
import { toast } from "sonner"

const initialState: TUserState = {
  users: [],
  billIssuers: [],
  status: {
    approveAdmin: "idle",
    fetchAllAdmin: "idle",
    fetchBillIssuers: "idle",
  },
  errorMessage: {
    approveAdmin: null,
    fetchAllAdmin: null,
    fetchBillIssuers: null,
  },
}

// fetch users
export const fetchAllAdmins = createAsyncThunk<
  TUser[],
  void,
  { rejectValue: string }
>("user/fetchAllAdmin", async (_, { rejectWithValue }) => {
  try {
    const response = await userRepository.fetchAllAdmins()
    return response.data.data
  } catch (error: AxiosError | any) {
    return rejectWithValue(
      error.response?.data?.error?.message || "Failed to fetch admins."
    )
  }
})

// approve user
export const approveAdmin = createAsyncThunk<
  void,
  TApproveUserPayload,
  { rejectValue: string }
>("user/approveAdmin", async (payload, { rejectWithValue }) => {
  try {
    await userRepository.approveAdmin(payload)
  } catch (error: AxiosError | any) {
    return rejectWithValue(
      error.response?.data?.error?.message || "Failed to approve admin."
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
      .addCase(fetchAllAdmins.pending, (state) => {
        state.status.fetchAllAdmin = "loading"
      })
      .addCase(fetchAllAdmins.fulfilled, (state, action) => {
        state.status.fetchAllAdmin = "succeeded"
        state.users = action.payload
      })
      .addCase(fetchAllAdmins.rejected, (state, action) => {
        state.status.fetchAllAdmin = "failed"
        toast.error(action.payload ?? "Failed to fetch admins.")
      })
      .addCase(fetchBillIssuers.pending, (state) => {
        state.status.fetchBillIssuers = "loading"
      })
      .addCase(fetchBillIssuers.fulfilled, (state, action) => {
        state.status.fetchBillIssuers = "succeeded"
        state.billIssuers = action.payload
      })
      .addCase(fetchBillIssuers.rejected, (state, action) => {
        state.status.fetchBillIssuers = "failed"
        toast.error(action.payload ?? "Failed to fetch bill issuers.")
      })
      .addCase(approveAdmin.pending, (state) => {
        state.status.approveAdmin = "loading"
      })
      .addCase(approveAdmin.fulfilled, (state) => {
        state.status.approveAdmin = "succeeded"
        toast.success("Admin approved successfully.")
      })
      .addCase(approveAdmin.rejected, (state, action) => {
        state.status.approveAdmin = "failed"
        toast.error(action.payload ?? "Failed to approve admin.")
      })
  },
})

export default userSlice.reducer
