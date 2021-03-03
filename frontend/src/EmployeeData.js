import React from 'react'
import useCurrentEmployee from './hooks/useCurrentEmployee'

export default function EmployeeData() {
  const { name, email } = useCurrentEmployee()
  return (
    <>
      <div className="text-truncate">{name || ''}</div>
      <div className="text-truncate">{email || ''}</div>
    </>
  )
}
