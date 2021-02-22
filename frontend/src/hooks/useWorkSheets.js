import { useState, useEffect } from 'react'
import { getWorkSheets } from '../api/WorkSheetAPI'

export default function useWorkSheets() {
  const [status, setStatus] = useState('')

  const [workSheets, setWorkSheets] = useState()
  useEffect(() => {
    async function updateWorkSheets() {
      const { data } = await getWorkSheets(status)
      setWorkSheets(data)
    }
    updateWorkSheets()
  }, [status])

  return {
    workSheets,
    status,
    setStatus,
  }
}
