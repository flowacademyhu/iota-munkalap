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

  let isCreate = window.location.pathname === '/partners/new'
  return (
    <PartnerForm
      handleClick={handleClick}
      sent={sent}
      popUpMessage={popUpMessage}
      sendData={savePartner}
      title={isCreate ? 'Partner létrehozása' : 'Adatok szerkesztése'}
      partner={!isCreate && partnerData}
    />
  )
}
