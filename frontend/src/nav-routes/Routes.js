import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Homepage from '../homepage/Homepage'
import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'
import ProfileForm from '../profiles/ProfileForm'
import PrivateRoute from '../nav-routes/PrivateRoutes'

const Routes = ({ login, register }) => {
  console.debug('Routes', `login=${typeof login}`, `register=${typeof register}`)

  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>

        <Route exact path="/register">
          <RegisterForm register={register} />
        </Route>

        <PrivateRoute exact path="/profile">
          <ProfileForm />
        </PrivateRoute>

        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default Routes
