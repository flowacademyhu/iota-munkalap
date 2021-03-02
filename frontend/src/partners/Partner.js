import React from 'react'
import PartnerForm from './PartnerForm'
import usePartnerData from '../hooks/usePartnerData'

export default function Partner() {
  const {
    savePartner,
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
        sendData={savePartner}
        title={'TITLE'}
      />
    </>
  ) : (
    <>
      {partnerData && (
        <PartnerForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={savePartner}
          title={'TITLE'}
          partner={partnerData}
        />
      )}
    </>
  )
}
