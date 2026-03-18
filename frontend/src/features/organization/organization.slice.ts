import type { AxiosError } from "axios"
import type { TOrganization, TOrganizationState } from "./organization.types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { TCreateOrganization } from "./organization.schema"
import { organizationService } from "./organization.service"

const initialState: TOrganizationState = {
  data: [],
  status: "idle",
  errorMessage: null,
}

export const createOrganization = createAsyncThunk<
  TOrganization,
  TCreateOrganization,
  { rejectValue: string }
>("organization/create", async (data, { rejectWithValue }) => {
  try {
    const response = await organizationService.create(data)
    console.log("Organization created successfully:", response)
    return response.data.data
  } catch (error: AxiosError | any) {
    // console.log("Error creating committee:", error)
    return rejectWithValue(
      error.response?.data?.error?.message || "Failed to create organization"
    )
  }
})

export const fetchOrganization = createAsyncThunk<
  TOrganization[],
  void,
  { rejectValue: string }
>("organization/fetch", async (_, { rejectWithValue }) => {
  try {
    const response = await organizationService.fetch()
    console.log("Organizations fetched successfully")
    return response.data.data
  } catch (error: AxiosError | any) {
    return rejectWithValue(
      error.response?.data?.error?.message || "Failed to fetch organization"
    )
  }
})

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    resetStatusAndErrorMessage: (state) => {
      state.status = "idle"
      state.errorMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrganization.pending, (state) => {
        state.status = "loading"
        state.errorMessage = null
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.errorMessage = null
        state.data = [...state.data, action.payload]
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.status = "failed"
        state.errorMessage = action.payload ?? "Failed to create organization"
      })
      .addCase(fetchOrganization.pending, (state) => {
        state.status = "loading"
        state.errorMessage = null
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.errorMessage = null
        state.data = [...action.payload]
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
        state.status = "failed"
        state.errorMessage = action.payload ?? "Failed to fetch organization"
      })
  },
})

export const { resetStatusAndErrorMessage } = organizationSlice.actions
export default organizationSlice.reducer
