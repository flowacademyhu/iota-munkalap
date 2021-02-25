import React from 'react'
import EmployeeForm from './EmployeeForm'
import useUserData from '../hooks/useUserData'

export default function Employee() {
  const {
    controlingEmployeeData,
    handleClick,
    popUpMessage,
    sent,
    userData,
  } = useUserData()

  return window.location.pathname === '/employees/new' ? (
    <>
      <EmployeeForm
        handleClick={handleClick}
        sent={sent}
        popUpMessage={popUpMessage}
        sendData={controlingEmployeeData}
        title="Új munkatárs létrehozása"
        notRegistration={false}
      />
    </>
  ) : (
    <>
      {userData && (
        <EmployeeForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={controlingEmployeeData}
          title="Adatok módosítása"
          user={userData}
          notRegistration={true}
        />
      )}
    </>
  )
}
