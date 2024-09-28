import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { logout } from "../../app/api/authActions"
import { useAppDispatch, useAppSelector } from "../../UseRedux"
import "./Header.css"

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user])

  const handleLoginClick = () => {
    navigate("/login")
  }

  const handleSignUpClick = () => {
    navigate("/signup")
  }

  const handleMainClick = () => {
    navigate("/")
  }

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout("users/logout"))
    }
  }

  return (
    <header className="header">
      {location.pathname === "/" && !user && (
        <>
          <button className="header__button" onClick={handleLoginClick}>
            Log In
          </button>
          <button className="header__button" onClick={handleSignUpClick}>
            Sign Up
          </button>
        </>
      )}
      {location.pathname !== "/" && (
        <button className="header__button" onClick={handleMainClick}>
          Main
        </button>
      )}
      {location.pathname === "/" && user && (
        <button className="header__button" onClick={handleLogoutClick}>
          Logout
        </button>
      )}
    </header>
  )
}
