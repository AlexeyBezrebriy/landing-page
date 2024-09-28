import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "../../UseRedux"
import { signUp } from "../../app/api/authActions"
import { validateEmail } from "../../utils/emailErrorHandler"

export const SignUpPage = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError(true)
      return
    }
    if (username.length < 3) {
      setError(true)
      return
    }
    if (password.length < 6) {
      setError(true)
      return
    }
    if (password !== confirmPassword) {
      setError(true)
      return
    }

    dispatch(signUp({ url: "users/signUp", username, password, email }))
    setEmail("")
    setUsername("")
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
          <h2 className="login__title">Sign Up</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              type="username"
              id="username"
              placeholder="User name"
            />
            {error && username.length < 3 && (
              <p className="error-message">User name must be at least 3 characters long.</p>
            )}
          </div>

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
            Sign Up
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
