import { useState, useEffect, useCallback } from 'react'
import { getWorkSheets } from '../api/WorkSheetAPI'

export default function useWorkSheets() {
  const [workSheets, setWorkSheets] = useState()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const updateWorkSheets = useCallback(
    async function () {
      const { data } = await getWorkSheets(startDate, endDate)
      if (data) {
        setWorkSheets(data)
      }
    },
    [startDate, endDate]
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
  }
}
