import { useState } from "react"
import { Link } from "react-router-dom"
import { signIn } from "../../app/api/authActions"
import { useAppDispatch } from "../../UseRedux"
import "./LoginPage.css"
import { validateEmail } from "../../utils/emailErrorHandler"

export const LogInPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.")
      return
    }

    dispatch(signIn({ url: "users/login", email, password }))
    setEmail("")
    setPassword("")
    setError("")
  }

  return (
    <div className="container">
      <div className="image-container">
        <img src="/login.jpg" alt="City" className="image" />
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="login__title">Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              required
            />
            {error && !validateEmail(email) && (
              <p className="error-message">Please enter a valid email address.</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              required
            />
            {error && password.length < 6 && (
              <p className="error-message">Password must be at least 6 characters long.</p>
            )}
          </div>
          <Link to="/forgot-password" className="forgot-password link">
            Forgot password?
          </Link>
          <button type="submit" className="submit-btn">
            Sign In
          </button>
          <p className="signup-link">
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
