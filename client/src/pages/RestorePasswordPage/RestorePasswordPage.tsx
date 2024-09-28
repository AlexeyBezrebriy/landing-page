import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../UseRedux"
import { resetPassword } from "../../app/api/authActions"

export const RestorePasswordPage = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()

  const { token } = useParams<{ token: string }>()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password.length < 6) {
      setError(true)
      return
    }
    if (password !== confirmPassword) {
      setError(true)
      return
    }

    if (token) {
      dispatch(resetPassword({ url: "users/reset-password", password, token }))
    } else {
      toast.error("Invalid token")
    }
    setPassword("")
    setConfirmPassword("")
    setError(false)
  }

  return (
    <div className="container">
      <div className="image-container">
        <img src="/login.jpg" alt="City" className="image" />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="login__title">Restore password</h2>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
              id="password"
              placeholder="Password"
            />
            {error && password.length < 6 && (
              <p className="error-message">Password must be at least 6 characters long.</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              type="password"
              id="confirm-password"
              placeholder="Confirm password"
            />
            {error && password !== confirmPassword && (
              <p className="error-message">The password and confirmation password do not match.</p>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}
