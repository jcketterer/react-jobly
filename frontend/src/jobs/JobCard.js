import React, { useState, useContext, useEffect } from 'react'
import './JobCard.css'
import UserContext from '../auth/UserContext'

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug('JobCard')

  const { jobApps, applyToJob } = useContext(UserContext)
  const [applied, setApplied] = useState()

  useEffect(
    function updateAppStatus() {
      console.debug('JobCard useEffect updateAppStatus', 'id=', id)

      setApplied(jobApps(id))
    },
    [id, jobApps]
  )

  const handleApply = async e => {
    if (jobApps(id)) return
    applyToJob(id)
    setApplied(true)
  }

  return (
    <div className="JobCard card">
      {applied}
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p>{companyName}</p>
        {salary && (
          <div>
            <small>Salary: {formatSalary(salary)}</small>
          </div>
        )}
        {equity !== undefined && (
          <div>
            <small>Equity: {equity}</small>
          </div>
        )}
        <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? 'Applied' : 'Apply'}
        </button>
      </div>
    </div>
  )
}

const formatSalary = salary => {
  const digitsRev = []
  const salaryStr = salary.toString()

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i])
    if (i > 0 && i % 3 === 0) digitsRev.push(',')
  }
  return digitsRev.reverse().join('')
}

export default JobCard
