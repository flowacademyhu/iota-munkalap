import { useState, useEffect, useCallback } from 'react'
import { getWorkSheets } from '../api/WorkSheetAPI'

export default function useWorkSheets() {
  const [status, setStatus] = useState('')

  const [workSheets, setWorkSheets] = useState()

  const updateWorkSheets = useCallback(
    async function () {
      const { data } = await getWorkSheets(status)
      if (data) {
        setWorkSheets(data)
      }
    },
    [status, setWorkSheets]
  )

  useEffect(() => {
    updateWorkSheets()
  }, [updateWorkSheets])

  return {
    workSheets,
    updateWorkSheets,
    status,
    setStatus,
  }
}
