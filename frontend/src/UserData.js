import React from 'react'
import useCurrentUser from './hooks/useCurrentUser'

function UserData() {
  const { name, email } = useCurrentUser()
  return (
    <>
      <div>{name || ''}</div>
      <div>{email || ''}</div>
    </>
  )
}

export default UserData
