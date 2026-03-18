import type { TCreateCommittee } from "./model/schema"
import type { TCommittee, TCommitteeState } from "./committee.types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { committeeService } from "./service/committee.service"
import type { AxiosError } from "axios"

const initialState: TCommitteeState = {
  data: [],
  status: "idle",
  errorMessage: null,
}

export const createCommittee = createAsyncThunk<
  TCommittee,
  TCreateCommittee,
  { rejectValue: string }
>("committee/createCommittee", async (data, { rejectWithValue }) => {
  try {
    const response = await committeeService.create(data)
    console.log("Committee created successfully:", response)
    return response.data.data
  } catch (error: AxiosError | any) {
    // console.log("Error creating committee:", error)
    return rejectWithValue(
      error.response?.data?.error?.message || "Failed to create committee"
    )
  }
})

const committeeSlice = createSlice({
  name: "committee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommittee.pending, (state) => {
        state.status = "loading"
        state.errorMessage = null
      })
      .addCase(createCommittee.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.errorMessage = null
        state.data = [...state.data, action.payload]
      })
      .addCase(createCommittee.rejected, (state, action) => {
        state.status = "failed"
        state.errorMessage = action.payload ?? "Failed to create committee"
      })
  },
})

export default committeeSlice.reducer
