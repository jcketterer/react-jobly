import React from 'react'
import { Link } from 'react-router-dom'
import './CompanyCard.css'

const CompanyCard = ({ name, description, logoUrl, handle }) => {
  console.debug('CompanyCard', logoUrl)

  return (
    <Link className="CompanyCard card" to={`/companies/${handle}`}>
      <div className="card-body">
        <h6 className="card-title">
          {name}
          {<img src={logoUrl} className="m-3" alt="" />}
        </h6>
        <p>
          <small>{description}</small>
        </p>
      </div>
    </Link>
  )
}

export default CompanyCard
