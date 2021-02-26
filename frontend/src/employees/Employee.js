import React from 'react'
import EmployeeForm from './EmployeeForm'
import useEmployeeData from '../hooks/useEmployeeData'

export default function Employee() {
  const {
    saveEmployee,
    handleClick,
    popUpMessage,
    sent,
    employeeData,
  } = useEmployeeData()

  return window.location.pathname === '/employees/new' ? (
    <>
      <EmployeeForm
        handleClick={handleClick}
        sent={sent}
        popUpMessage={popUpMessage}
        sendData={saveEmployee}
        title="Új munkatárs létrehozása"
        isCreate={true}
      />
    </>
  ) : (
    <>
      {employeeData && (
        <EmployeeForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={saveEmployee}
          title="Adatok módosítása"
          employee={employeeData}
          isCreate={false}
        />
      )}
    </>
  )
}
