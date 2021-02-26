import React from 'react'
import EmployeeForm from './EmployeeForm'
import useEmployeeData from '../hooks/useEmployeeData'

export default function Employee() {
  const {
    saveEmployee,
    handleClick,
    popUpMessage,
    sent,
    userData,
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
      {userData && (
        <EmployeeForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={saveEmployee}
          title="Adatok módosítása"
          user={userData}
          isCreate={false}
        />
      )}
    </>
  )
}
