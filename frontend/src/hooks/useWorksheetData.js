import { useState, useEffect } from 'react'
import { getWorkSheet, postWorkSheet, putWorkSheet } from '../api/WorkSheetAPI'
import { useParams, useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'

export default function useWorksheetData() {
  const [sent, setSent] = useState(false)
  const [sentSuccessfully, setSentSuccessfully] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const { id } = useParams()
  const [worksheetData, setWorksheetData] = useState({})

  const history = useHistory()

  function handleClick() {
    sentSuccessfully && history.push(`/${PATH_VARIABLES.WORKSHEET}`)
    setSent(false)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getWorkSheet(id)
        setWorksheetData({ ...response.data, loaded: true })
      } catch (error) {
        setWorksheetData({ loaded: true })
        setPopUpMessage('A módosítás sikertelen')
        setSent(true)
      }
    }
    fetchData()
  }, [id])

  async function HandleData(values) {
    const { workSheetApi, setWorkSheetDataHandle } = useState()
    if (id === null) {
      setWorkSheetDataHandle(putWorkSheet(values))
    } else {
      setWorkSheetDataHandle(postWorkSheet(id, values))
    }
    try {
      const response = await workSheetApi
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
    worksheetData,
    popUpMessage,
    sent,
  }
}
