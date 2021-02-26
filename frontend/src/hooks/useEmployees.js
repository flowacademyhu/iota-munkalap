import { useState, useEffect, useCallback, useRef } from 'react'
import { getEmployees } from '../api/EmployeeAPI'

export default function useEmployees() {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState(null)

  const lastCancel = useRef(null)

  const [employees, setEmployees] = useState()
  const updateEmployees = useCallback(
    async function () {
      if (lastCancel.current) {
        lastCancel.current()
      }
      const { request, cancel } = getEmployees(keyword.toLowerCase(), status)
      lastCancel.current = cancel
      const { data } = await request
      lastCancel.current = null
      if (data) {
        setEmployees(data)
      }
    },
    [keyword, status, lastCancel]
  )

  useEffect(() => {
    updateEmployees()
  }, [updateEmployees])
  return {
    updateEmployees,
    setEmployees,
    employees,
    keyword,
    setKeyword,
    status,
    setStatus,
  }
}
