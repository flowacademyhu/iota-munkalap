import { useState } from 'react'

export default function useToken() {
  function getToken() {
    return sessionStorage.getItem('token')
  }

  const [token, setToken] = useState(getToken())

  function saveToken(token) {
    if (!token) {
      sessionStorage.clear('acces_token')
      setToken('')
      return
    }
    sessionStorage.setItem('token', token)
    setToken(token)
  }

  return {
    setToken: saveToken,
    token,
  }
}
