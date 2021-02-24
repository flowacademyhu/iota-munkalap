import { useState, useEffect } from 'react'
import { getWorkSheet } from '../api/WorkSheetAPI'
import { useParams } from 'react-router-dom'

export default function useWorksheetData() {
  const [worksheetData, setWorksheetData] = useState({})
  const [fetchSent, setSent] = useState(false)
  const [fetchPopUpMessage, setPopUpMessage] = useState('')
  const { id } = useParams()

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
  return {
    worksheetData,
    fetchPopUpMessage,
    fetchSent,
  }
}
