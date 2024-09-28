import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../UseRedux"
import { resetLink } from "../../app/api/authActions"
import { validateEmail } from "../../utils/emailErrorHandler"

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError(true)
      return
    }

    dispatch(resetLink({ url: "users/reset-link", email }))
    setEmail("")
    setError(false)
  }

  return (
    <div className="container">
      <div className="image-container">
        <img src="/login.jpg" alt="City" className="image" />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="login__title">Forgot password</h2>
          <div className="form-group">
            <label htmlFor="email">Please entry your email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type="email"
              id="email"
              placeholder="Email"
            />
            {error && !validateEmail(email) && (
              <p className="error-message">Please enter a valid email address.</p>
            )}
          </div>

          <button type="submit" className="submit-btn">
            Send
          </button>

          <p className="signup-link">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
