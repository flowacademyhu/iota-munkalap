import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginForm from './LoginForm'
import useToken from './hooks/useToken'
import Page from './Page'
import './style.css'

function App() {
  const { token, setToken } = useToken()
  if (!token) {
    return <LoginForm setToken={setToken} />
  }

  return <Page />
}

export default App
