import './App.css';
import Page from './Page';
import React, { useState } from 'react';
//import Login from './Login'



function App() {

  const [token, setToken] = useState();

  if(!token) {
    return (
      //<Login setToken={setToken}/> //Decoment this when Login is done and funktioning 
      <div>Login needed</div>
      )
  }

  return (

      <Page/>
    
  );
}

export default App;
