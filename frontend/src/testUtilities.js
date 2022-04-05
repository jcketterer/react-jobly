import React from 'react'
import UserContext from './auth/UserContext'

const testUser = {
  username: 'testuser',
  first_name: 'testfirst',
  last_name: 'testlast',
  email: 'test@test.com',
  photo_url: null,
}

const UserProvider = ({ children, currUser = testUser }) => (
  <UserContext.Provider value={{ currUser }}>{children}</UserContext.Provider>
)

export { UserProvider }
