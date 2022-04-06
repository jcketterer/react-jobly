import React, { useState, useEffect } from 'react'
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'
import CompanyCard from './CompanyCard'
import LoadingSpinner from '../common/LoadingSpinner'

const CompanyList = () => {
  console.debug('CompanyList')

  const [companies, setCompanies] = useState(null)

  useEffect(function getCompanyOnMount() {
    console.debug('CompanyList useEffect getCompaniesOnMount')
    search()
  }, [])

  const search = async name => {
    let companies = await JoblyApi.getCompanies(name)
    setCompanies(companies)
  }

  if (!companies) return <LoadingSpinner />

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map(company => (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              description={company.description}
              logoUrl={company.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry! No results were found!</p>
      )}
    </div>
  )
}

export default CompanyList
