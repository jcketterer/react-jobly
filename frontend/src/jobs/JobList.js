import React, { useState, useEffect } from 'react'
import SearchForm from '../common/SearchForm'
import JoblyApi from '../api/api'
import JobCardList from '../jobs/JobCardList'
import LoadingSpinner from '../common/LoadingSpinner'

const JobList = () => {
  console.debug('JobList')

  const [jobs, setJobs] = useState(null)

  useEffect(function getAllJobsOnMount() {
    console.debug('JobList useEffect getAllJobsOnMount')
    search()
  }, [])

  const search = async title => {
    let jobs = await JoblyApi.getJobs(title)
    setJobs(jobs)
  }

  if (!jobs) return <LoadingSpinner />

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {jobs.length ? (
        <JobCardList jobs={jobs} />
      ) : (
        <p className="lead">Sorry! No results were found!</p>
      )}
    </div>
  )
}

export default JobList
