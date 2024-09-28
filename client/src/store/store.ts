import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import dealReducer from "./dealSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deals: dealReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
