import { useRef } from "react"
import { Deals } from "../../components/Deals/Deals"
import { Header } from "../../components/Header/Header"
import { Hero } from "../../components/Hero/Hero"
import "./MainPage.css"

export const MainPage = () => {
  const dealsRef = useRef<HTMLElement | null>(null)

  const scrollToDeals = () => {
    dealsRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="main-page">
      {/* <Header /> */}
      <Hero scrollToDeals={scrollToDeals} />
      <Deals ref={dealsRef} />
    </div>
  )
}
