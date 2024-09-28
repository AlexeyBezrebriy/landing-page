import { createSlice } from "@reduxjs/toolkit"
import {
  checkUserAuth,
  logout,
  resetLink,
  resetPassword,
  signIn,
  signUp,
} from "../app/api/authActions"
import { IAuthState } from "../types/auth"

const initialState: IAuthState = {
  user: null,
  loading: false,
  error: null,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string | null
    })

    builder.addCase(signIn.pending, (state) => {
      state.loading = true
    })
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string | null
    })

    builder.addCase(checkUserAuth.pending, (state) => {
      state.loading = true
    })
    builder.addCase(checkUserAuth.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(checkUserAuth.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string | null
    })

    builder.addCase(resetLink.pending, (state) => {
      state.loading = true
    })
    builder.addCase(resetLink.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(resetLink.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string | null
    })

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true
    })
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string | null
    })

    builder.addCase(logout.pending, (state) => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false
      state.user = null
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string | null
    })
  },
})

export const { resetError } = authSlice.actions

export default authSlice.reducer
