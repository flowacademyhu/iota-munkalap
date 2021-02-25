import React from 'react'
import EmployeeForm from './EmployeeForm'
import useUserData from '../hooks/useUserData'

export default function Employee() {
  const {
    HandleData,
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
        sendData={HandleData}
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
          sendData={HandleData}
          title="Adatok módosítása"
          user={userData}
          notRegistration={true}
        />
      )}
    </>
  )
}
