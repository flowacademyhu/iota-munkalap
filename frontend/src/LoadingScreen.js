import React from 'react';
import load from './img/Pulse-1s-200px.gif';

function LoadingScreen() {
  return (
      <div id = "Outer">
      <img class="image-container" src={load}/>
</div>
  )
}

export default LoadingScreen;