import React from 'react'
import PartnerForm from './PartnerForm'
import usePartnerData from '../hooks/usePartnerData'

export default function Partner() {
  const {
    HandleData,
    handleClick,
    popUpMessage,
    sent,
    partnerData,
  } = usePartnerData()

  return window.location.pathname === '/partners/new' ? (
    <>
      <PartnerForm
        handleClick={handleClick}
        sent={sent}
        popUpMessage={popUpMessage}
        sendData={HandleData}
        title="Partner létrehozása"
      />
    </>
  ) : (
    <>
      {partnerData && (
        <PartnerForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={HandleData}
          title="Adatok szerkesztése"
          partner={partnerData}
        />
      )}
    </>
  )
}
