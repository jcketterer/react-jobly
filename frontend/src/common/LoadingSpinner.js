import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className="container">
      <div className="LoadingSpinner-wrapper">
        Loading...
        <div className="LoadingSpinner">
          <div className="LoadingSpinner loader-inner"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
