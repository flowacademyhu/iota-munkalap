import React from 'react'
import { useJwt } from 'react-jwt'
import useToken from './hooks/useToken'

function UserData() {
  const { token } = useToken()
  const { decodedToken } = useJwt(token)

  return (
    <>
      <div>{decodedToken?.name || ''}</div>
      <div>{decodedToken?.email || ''}</div>
    </>
  )
}

export default UserData
