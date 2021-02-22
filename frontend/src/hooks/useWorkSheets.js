import { useState, useEffect } from 'react'
import { getWorkSheets } from '../api/WorkSheetAPI'

export default function useWorkSheets() {
  const [workSheetStatus, setWorkSheetStatus] = useState(null)

  const [workSheets, setWorkSheets] = useState()
  useEffect(() => {
    async function updateWorkSheets() {
      const { data } = await getWorkSheets()
      setWorkSheets(data)
    }
    updateWorkSheets()
  }, [])
  return {
    workSheets,
    workSheetStatus,
    setWorkSheetStatus,
  }
}
