import { createSlice } from "@reduxjs/toolkit"
import { createDeal, fetchDeals } from "../app/api/dealAction"
import { IDeal } from "../types/deal"

interface DealState {
  deals: IDeal[]
  loading: boolean
  error: string | null
}

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null,
}

const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeals.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchDeals.fulfilled, (state, action) => {
      state.loading = false
      state.deals = action.payload
    })
    builder.addCase(fetchDeals.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string | null
    })

    builder.addCase(createDeal.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.loading = false
      state.deals.push(action.payload)
    })
    builder.addCase(createDeal.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string | null
    })
  },
})

export default dealSlice.reducer
