import React from 'react'
import load from './img/Pulse-1s-200px.gif'

function LoadingScreen() {
  return (
    <div className="d-flex justify-content-center">
      <img alt="Loading..." src={load} />
    </div>
  )
}

export default LoadingScreen
