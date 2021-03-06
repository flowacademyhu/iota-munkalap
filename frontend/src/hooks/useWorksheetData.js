import { useState, useEffect, useCallback } from 'react'
import {
  createWorkSheet,
  updateWorkSheet,
  getWorkSheet,
} from '../api/WorkSheetAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

export default function useWorksheetData() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const [worksheetData, setWorksheetData] = useState()
  const { id } = useParams()

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.WORKSHEET}`)
    setSent(false)
  }

  const updateWorksheet = useCallback(
    async function () {
      if (id !== undefined) {
        try {
          const response = await getWorkSheet(id)
          setWorksheetData({ ...response, loaded: true })
        } catch (error) {
          setWorksheetData({ loaded: true })
          setPopUpMessage('A módosítás sikertelen')
          setSent(true)
        }
      }
    },
    [id]
  )

  useEffect(() => {
    updateWorksheet()
  }, [updateWorksheet])

  async function saveWorksheet(values) {
    try {
      const response =
        id !== undefined
          ? await updateWorkSheet(id, values)
          : await createWorkSheet(values)
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
    updateWorksheet,
    saveWorksheet,
    handleClick,
    popUpMessage,
    sent,
    worksheetData,
  }
}
