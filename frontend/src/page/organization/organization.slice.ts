import type { AxiosError } from "axios"
import type { TOrganization, TOrganizationState } from "./organization.types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { TCreateOrganization } from "./organization.schema"
import { organizationService } from "./organization.service"

const initialState: TOrganizationState = {
  data: [],
  status: {
    create: "idle",
    fetch: "idle",
    fetchUserAssigned: "idle",
  },
  errorMessage: {
    create: null,
    fetch: null,
    fetchUserAssigned: null,
  },
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

export const fetchUserAssignedOrganization = createAsyncThunk<
  TOrganization,
  void,
  { rejectValue: string }
>("organization/fetchUserAssigned", async (_, { rejectWithValue }) => {
  try {
    const response = await organizationService.fetchUserAssigned()
    return response.data.data
  } catch (error: AxiosError | any) {
    return rejectWithValue(
      error.response?.data?.error?.message ||
        "Failed to fetch user assigned organization"
    )
  }
})

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrganization.pending, (state) => {
        state.status.create = "loading"
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.status.create = "succeeded"
        state.data = [...state.data, action.payload]
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.status.create = "failed"
        state.errorMessage.create =
          action.payload ?? "Failed to create organization"
      })
      .addCase(fetchOrganization.pending, (state) => {
        state.status.fetch = "loading"
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.status.fetch = "succeeded"
        state.data = [...action.payload]
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
        state.status.fetch = "failed"
        state.errorMessage.fetch =
          action.payload ?? "Failed to fetch organization"
      })
      .addCase(fetchUserAssignedOrganization.pending, (state) => {
        state.status.fetchUserAssigned = "loading"
      })
      .addCase(fetchUserAssignedOrganization.fulfilled, (state, action) => {
        state.status.fetchUserAssigned = "succeeded"
        state.data.push(action.payload)
      })
      .addCase(fetchUserAssignedOrganization.rejected, (state, action) => {
        state.status.fetchUserAssigned = "failed"
        state.errorMessage.fetchUserAssigned =
          action.payload ?? "Failed to fetch user assigned organization"
      })
  },
})

export default organizationSlice.reducer
