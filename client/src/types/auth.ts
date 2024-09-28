import { IUser } from "./user"

export interface ISignUp {
  url: string
  username: string
  password: string
  email: string
}

export interface ISignIn {
  url: string
  email: string
  password: string
}

export interface IResetLink {
  url: string
  email: string
}

export interface IResetPassword {
  url: string
  password: string
  token: string
}

export interface IAuthState {
  user: IUser | null
  loading: boolean
  error: string | null
}
