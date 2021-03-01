import React, { useState, useEffect } from 'react'
import PartnerForm from './PartnerForm'
import { updatePartner, getPartner } from '../api/PartnerAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

export default function Partner() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const { id } = useParams()
  const [partnerData, setPartnerData] = useState({})

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.PARTNER}`)
    setSent(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPartner(id)
        setPartnerData({ ...response.data, loaded: true })
      } catch (error) {
        setPartnerData({ loaded: true })
        setPopUpMessage('A módosítás sikertelen')
        setSent(true)
      }
    }
    fetchData()
  }, [id])

  async function putData(values) {
    try {
      const response = await updatePartner(id, values)
      if (response.status === 200) {
        setPopUpMessage('Partner sikeresen módosítva')
        setSentSuccessfully(true)
      }
    } catch (error) {
      setPopUpMessage('A módosítás sikertelen')
    } finally {
      setSent(true)
    }
  }

  return (
    <>
      {partnerData.loaded && (
        <PartnerForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={putData}
          title="Adatok módosítása"
          partner={partnerData}
        />
      )}
    </>
  )
}

import React from 'react'
import PartnerForm from './PartnerForm'
import usePartnerData from '../hooks/usePartnerData'

export default function Partner() {
  const {
    handleData,
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
      sendData={handleData}
      title={isCreate ? 'Partner létrehozása' : 'Adatok szerkesztése'}
      partner={!isCreate && partnerData}
    />
  )
}
