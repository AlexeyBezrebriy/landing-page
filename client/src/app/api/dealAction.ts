import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../axiosClient"
import { IDeal } from "../../types/deal"

export const fetchDeals = createAsyncThunk(
  "deals/get-all",
  async (url: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get<IDeal[]>(url)
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const createDeal = createAsyncThunk(
  "deals/create",
  async ({ url, deal }: { url: string; deal: IDeal }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(url, deal)
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)
