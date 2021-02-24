import { useState } from 'react'
import { postWorkSheet, putWorkSheet } from '../api/WorkSheetAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

export default function useWorksheetData() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const { id } = useParams()

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.WORKSHEET}`)
    setSent(false)
  }

  async function HandleData(values) {
    const { WorkSheetDataHandle, setWorkSheetDataHandle } = useState()
    if (id === null) {
      setWorkSheetDataHandle(putWorkSheet(values))
    } else {
      setWorkSheetDataHandle(postWorkSheet(id, values))
    }
    try {
      const response = await WorkSheetDataHandle
      if (response.status === 200) {
        setPopUpMessage('Munkalap sikeresen módosítva')
        setSentSuccessfully(true)
      }
      if (response.status === 201) {
        setPopUpMessage('Munkalap sikeresen létrehozva')
        setSentSuccessfully(true)
      }
    } catch (error) {
      setPopUpMessage('A művelet sikertelen')
    } finally {
      setSent(true)
    }
  }

  return {
    HandleData,
    handleClick,
    popUpMessage,
    sent,
  }
}
