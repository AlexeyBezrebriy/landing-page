import { useEffect } from "react"
import { useAppDispatch } from "../../UseRedux"
import "./Hero.css"
import { fetchDeals } from "../../app/api/dealAction"

export const Hero: React.FC<{ scrollToDeals: () => void }> = ({ scrollToDeals }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchDeals("deals/get-all"))
  }, [])

  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1>The chemical negatively charged</h1>
        <p>
          Numerous calculations predict, and experiments confirm, that the force field reflects the
          beam, while the mass defect is not formed. The chemical compound is negatively charged.
          Twhile the mass defect is
        </p>
        <button className="hero__button" onClick={scrollToDeals}>
          Get Started
        </button>
      </div>
    </section>
  )
}
