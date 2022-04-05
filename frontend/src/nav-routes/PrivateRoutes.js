import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext from '../auth/UserContext'

const PrivateRoute = ({ exact, path, children }) => {
  const { currUser } = useContext(UserContext)

  console.debug('PrivateRoute', 'exact=', exact, 'path=', path, 'currUser=', currUser)

  if (!currUser) {
    return <Redirect to="/login" />
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  )
}

export default PrivateRoute
