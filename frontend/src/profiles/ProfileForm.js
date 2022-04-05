import React, { useState, useContext } from 'react'
import Alert from '../common/Alert'
import JoblyApi from '../api/api'
import UserContext from '../auth/UserContext'
import useTimedMessage from '../hooks/useTimedMessage'

const ProfileForm = () => {
  const { currUser, setCurrUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    username: currUser.username,
    password: '',
  })
  const [formErrors, setFormErrors] = useState([])

  const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
    'ProfileForm',
    'currUser=',
    currUser,
    'formData=',
    formData,
    'formErrors=',
    formErrors,
    'saveConfirmed=',
    saveConfirmed
  )

  const handleSubmit = async e => {
    e.preventDefault()

    let profileData = {
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email,
      password: currUser.password,
    }

    let username = formData.username
    let updatedUser

    try {
      updatedUser = await JoblyApi.saveProfile(username, profileData)
    } catch (e) {
      setFormErrors(e)
      return
    }

    setFormData(data => ({ ...data, password: '' }))
    setFormErrors([])
    setSaveConfirmed(true)
    setCurrUser(updatedUser)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(data => ({
      ...data,
      [name]: value,
    }))
    setFormErrors([])
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{formData.username}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Please confirm password to save all changes.</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                autoComplete="current-password"
                onChange={handleChange}
              />
            </div>

            {formErrors.length ? <Alert type="danger" message={formErrors} /> : null}

            {saveConfirmed ? (
              <Alert type="success" message={['Update Completed Successfully!']} />
            ) : null}

            <button className="btn btn-primary btn-block mt-4" onClick={handleSubmit}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
