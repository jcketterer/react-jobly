import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import NavBar from './nav-routes/NavBar'
import Routes from './nav-routes/Routes'
import UserContext from './auth/UserContext'
import useLocalStorage from './hooks/useLocalStorage'
import JoblyApi from './api/api'
import jwt from 'jsonwebtoken'
import './App.css'

export const TOKEN_ID = 'jobly-token'

function App() {
  const [currUser, setCurrUser] = useState(null)
  const [appIDs, setAppIDs] = useState(new Set([]))
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [token, setToken] = useLocalStorage(TOKEN_ID)

  console.debug('App', 'infoLoaded=', infoLoaded, 'currUser=', currUser, 'token=', token)

  useEffect(
    function loadUser() {
      console.debug('App useEffect loadUser', 'token=', token)

      const getCurrUser = async () => {
        if (token) {
          try {
            let { username } = jwt.decode(token)
            JoblyApi.token = token
            let currUser = await JoblyApi.getCurrUser(username)
            setCurrUser(currUser)
            setAppIDs(new Set(currUser.applications))
          } catch (e) {
            console.error('App loadUserInfo: error loading', e)
            setCurrUser(null)
          }
        }
        setInfoLoaded(true)
      }

      setInfoLoaded(false)
      getCurrUser()
    },
    [token]
  )

  const logout = () => {
    setCurrUser(null)
    setToken(null)
  }

  const register = async registerData => {
    try {
      let token = await JoblyApi.register(registerData)
      setToken(token)
      return { success: true }
    } catch (e) {
      console.error('registration failed', e)
      return { success: false, e }
    }
  }

  const login = async loginData => {
    try {
      let token = await JoblyApi.login(loginData)
      setToken(token)
      return { success: true }
    } catch (e) {
      console.error('login failed', e)
      return { success: false, e }
    }
  }

  const jobApps = async id => {
    return appIDs.has(id)
  }

  const applyToJob = async id => {
    if (jobApps(id)) return
    JoblyApi.applyToJob(currUser.username, id)
    setAppIDs(new Set([...appIDs, id]))
  }

  if (!infoLoaded) return <p>Loading....</p> //ADD LOADING COMPONENT HERE

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currUser, setCurrUser, jobApps, applyToJob }}>
        <div className="App">
          <NavBar logout={logout} />
          <Routes login={login} register={register} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App