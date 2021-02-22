import React from 'react'
import load from './img/Pulse-1s-200px.gif'

function LoadingScreen() {
  return (
    <div id="row">
      <div className="d-flex justify-content-center">
        <img alt="Loading..." src={load} />
      </div>
    </div>
  )
}

export default LoadingScreen
