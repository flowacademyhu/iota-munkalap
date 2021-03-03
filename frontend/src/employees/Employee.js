import React from 'react'
import EmployeeForm from './EmployeeForm'
import useEmployeeData from '../hooks/useEmployeeData'
import LoadingScreen from '../LoadingScreen'

export default function Employee() {
  const {
    saveEmployee,
    handleClick,
    popUpMessage,
    sent,
    employeeData,
  } = useEmployeeData()

  let isCreate = window.location.pathname === '/employees/new'
  return isCreate || employeeData ? (
    <EmployeeForm
      isCreate={isCreate}
      handleClick={handleClick}
      sent={sent}
      popUpMessage={popUpMessage}
      sendData={saveEmployee}
      title={isCreate ? 'Munkatárs létrehozása' : 'Adatok szerkesztése'}
      employee={employeeData}
    />
  ) : (
    <LoadingScreen />
  )
}
