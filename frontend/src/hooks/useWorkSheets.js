import { useState, useEffect, useCallback } from 'react'
import { getWorkSheets } from '../api/WorkSheetAPI'

export default function useWorkSheets() {
  const [status, setStatus] = useState('ALL')

  const [workSheets, setWorkSheets] = useState()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const updateWorkSheets = useCallback(
    async function () {
      const data = await getWorkSheets(startDate, endDate, status)
      if (data) {
        setWorkSheets(data)
      }
    },
    [startDate, endDate, status, setWorkSheets]
  )

  useEffect(() => {
    updateWorkSheets()
  }, [updateWorkSheets])

  return {
    workSheets,
    updateWorkSheets,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
  }
}
