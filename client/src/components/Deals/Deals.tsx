import React from "react"
import { useAppSelector } from "../../UseRedux"
import "./Deals.css"

export const Deals = React.forwardRef<HTMLElement>((_, ref) => {
  const deals = useAppSelector((state) => state.deals.deals)

  return (
    <section className="deals" ref={ref}>
      <ul className="deals__grid">
        <h2 className="deals__grid-title">Open Deals</h2>
        {deals.map((deal, index) => (
          <li className="deal__card" key={index}>
            <img src={deal.imageUrl} alt={deal.name} />
            <h3 className="deals__name">{deal.name}</h3>
            <p className="deals__additional-information deals__price">{deal.price} Dhs</p>
            <p className="deals__additional-information deals__yield">Yield {deal.yield}</p>
            <p className="deals__additional-information deals__sold">Sold {deal.soldPercentage}</p>
            <p className="deals__additional-information deals__ticket">
              Ticket - {deal.ticket} Dhs
            </p>
            <p className="deals__additional-information deals__days-left">
              {deal.daysLeft} Days left
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
})
