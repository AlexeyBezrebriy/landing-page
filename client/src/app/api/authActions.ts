import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { toast } from "react-toastify"
import { HTTPStatus } from "../../constans"
import { IResetLink, IResetPassword, ISignIn, ISignUp } from "../../types/auth"
import api from "../axiosClient"

export const signUp = createAsyncThunk(
  "users/signup",
  async ({ url, username, password, email }: ISignUp, { rejectWithValue }) => {
    try {
      const { data } = await api.post(url, { username, password, email })

      if (data.warningMessage) {
        toast.warning(data.warningMessage, { toastId: "warning_signup" })
        return rejectWithValue(data.warningMessage)
      }

      toast.success("Registration was successful!", {
        toastId: "success_registration",
      })
      return data
    } catch (error) {
      toast.error("Check that all fields are correct.", { toastId: "warning_enter" })
      return rejectWithValue((error as Error).message)
    }
  }
)

export const signIn = createAsyncThunk(
  "users/login",
  async ({ url, email, password }: ISignIn, { rejectWithValue }) => {
    try {
      const { data } = await api.post(url, { email, password })
      console.log(data)

      toast.success("The entry is complete!", {
        toastId: "success_enter",
      })

      return data
    } catch (error) {
      toast.error("Wrong email or password", { toastId: "warning_enter" })
      return rejectWithValue((error as Error).message)
    }
  }
)

export const resetLink = createAsyncThunk(
  "users/reset-link",
  async ({ url, email }: IResetLink, { rejectWithValue }) => {
    try {
      const { data } = await api.post(url, { email })

      if (data.status !== 200) {
        toast.warning(data.message, { toastId: "warning_reset_link" })
        return rejectWithValue(data.message)
      }

      toast.success("Message sent to your email!", {
        toastId: "success_reset_link",
      })

      return data
    } catch (error) {
      toast.error((error as Error).message, { toastId: "warning_enter" })
      return rejectWithValue((error as Error).message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  "users/reset-password",
  async ({ url, password, token }: IResetPassword, { rejectWithValue }) => {
    try {
      const { data } = await api.post(url, { password, token })

      if (data.status !== 200) {
        toast.warning(data.message, { toastId: "warning_reset_password" })
        return rejectWithValue(data.message)
      }

      toast.success("Password changed successfully!", {
        toastId: "success_reset_password",
      })

      return data
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const checkUserAuth = createAsyncThunk(
  "users/login-check",
  async (url: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      const axiosError = error as AxiosError
      const status = axiosError.response?.status
      if (status === HTTPStatus.FORBIDDEN) {
        return false
      }

      toast.error((error as Error).message, { toastId: "warning_check_user_auth" })
      return rejectWithValue(axiosError.response?.data)
    }
  }
)

export const logout = createAsyncThunk("users/logout", async (url: string, { rejectWithValue }) => {
  try {
    await api.get(url)
    toast.success("Logged out successfully!")
  } catch (error) {
    toast.error((error as Error).message, { toastId: "warning_logout" })
    return rejectWithValue((error as AxiosError).response?.data)
  }
})
