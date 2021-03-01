import React from 'react'
import useCurrentEmployee from './hooks/useCurrentEmployee'

export default function EmployeeData() {
  const { name, email } = useCurrentEmployee()
  return (
    <>
      <div>{name || ''}</div>
      <div>{email || ''}</div>
    </>
  )
}
