import React, { useState } from 'react'
import { postUser } from '../api/UserAPI'
import CreateEmployeeForm from './CreateEmployeeForm'
import { PATH_VARIABLES } from '../Const'
import { useHistory } from 'react-router-dom'

function CreateEmployee() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.EMPLOYEE}`)
  }

  async function postData(values) {
    try {
      const response = await postUser(values)
      if (response.status === 201) {
        setPopUpMessage('Munkavállaló sikeresen létrehozva')
        setSentSuccessfully(true)
      }
    } catch (error) {
      setPopUpMessage('A létrehozás sikertelen')
    } finally {
      setSent(true)
    }
  }

  return (
    <CreateEmployeeForm
      handleClick={handleClick}
      sent={sent}
      popUpMessage={popUpMessage}
      sendData={postData}
      title="Új munkatárs létrehozása"
    />
  )
}

export default CreateEmployee
