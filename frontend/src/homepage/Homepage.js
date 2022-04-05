import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'
import UserContext from '../auth/UserContext'

const Homepage = () => {
  const { currUser } = useContext(UserContext)
  console.debug('Homepage', 'currUser=', currUser)

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 font-weight-bold">Jobly!</h1>
        <p className="lead">All the jobs in one, simple place</p>
        {currUser ? (
          <h2>Welcome Back, {currUser.firstName || currUser.username}!</h2>
        ) : (
          <p>
            <Link className="btn btn-primary m-3 font-weight-bold" to="/login">
              Log In
            </Link>
            <Link className="btn btn-primary font-weight-bold" to="/register">
              Register
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

export default Homepage
