import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserContext from '../auth/UserContext'
import './NavBar.css'

const NavBar = ({ logout }) => {
  const { currUser } = useContext(UserContext)

  console.debug('NavBar', 'currUser=', currUser)

  const logInNav = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <Link className="nav-link" to="/" onClick={logout}>
            Log Out {currUser.first_name || currUser.username}
          </Link>
        </li>
      </ul>
    )
  }

  const logOutNav = () => {
    return (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item mr-4">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
      </ul>
    )
  }

  return (
    <nav className="NavBar navbar navbar-expand-md ml-2">
      <Link className="navbar-brand" to="/">
        Jobly!
      </Link>
      {currUser ? logInNav() : logOutNav()}
    </nav>
  )
}

export default NavBar
