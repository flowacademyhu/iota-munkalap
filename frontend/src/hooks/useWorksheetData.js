import { useState, useEffect, useCallback } from 'react'
import { postWorkSheet, putWorkSheet, getWorkSheet } from '../api/WorkSheetAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

export default function useWorksheetData() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const [worksheetData, setWorksheetData] = useState()
  const { id } = useParams()
  const [WorkSheetDataHandle, setWorkSheetDataHandle] = useState(false)

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.WORKSHEET}`)
    setSent(false)
  }

  const UpdateWorksheet = useCallback(
    async function () {
      try {
        const response = await getWorkSheet(id)
        setWorksheetData({ ...response.data, loaded: true })
      } catch (error) {
        setWorksheetData({ loaded: true })
        setPopUpMessage('A módosítás sikertelen')
        setSent(true)
      }
    },
    [id]
  )

  useEffect(() => {
    UpdateWorksheet()
  }, [UpdateWorksheet])

  async function HandleData(values) {
    if (id !== undefined) {
      setWorkSheetDataHandle(true)
    }
    try {
      const response = WorkSheetDataHandle
        ? await putWorkSheet(id, values)
        : await postWorkSheet(values)
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
    UpdateWorksheet,
    HandleData,
    handleClick,
    popUpMessage,
    sent,
    worksheetData,
  }
}
