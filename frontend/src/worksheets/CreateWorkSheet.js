import React, { useState } from 'react'
import { postWorkSheet } from '../api/WorkSheetAPI'
import { PATH_VARIABLES } from '../Const'
import CreateWorkSheetForm from './CreateWorkSheetForm'
import { useHistory } from 'react-router-dom'

function CreateWorkSheet() {
  const [sent, setSent] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')

  const history = useHistory()

  function handleClick() {
    sent && history.push(`/${PATH_VARIABLES.WORKSHEET}`)
  }

  async function postData(values) {
    try {
      const response = await postWorkSheet(values)
      if (response.status === 201) {
        setPopUpMessage('Munkalap sikeresen létrehozva')
      }
    } catch (error) {
      setPopUpMessage('A létrehozás sikertelen')
    } finally {
      setSent(true)
    }
  }

  return (
    <CreateWorkSheetForm
      handleClick={handleClick}
      sent={sent}
      popUpMessage={popUpMessage}
      sendData={postData}
      title="Új munkalap létrehozása"
    />
  )
}

export default CreateWorkSheet
