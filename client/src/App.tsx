import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import { Header } from "./components/Header/Header"
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage/ForgotPasswordPage"
import { LogInPage } from "./pages/LoginPage/LogInPage"
import { MainPage } from "./pages/MainPage/MainPage"
import { RestorePasswordPage } from "./pages/RestorePasswordPage/RestorePasswordPage"
import { SignUpPage } from "./pages/SignUpPage/SignUpPage"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/restore-password/:token" element={<RestorePasswordPage />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        limit={1}
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
