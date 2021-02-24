import { useState, useEffect, useCallback, useRef } from 'react'
import { getUsers } from '../api/UserAPI'

export default function useUsers() {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState(null)

  const lastCancel = useRef(null)

  const [users, setUsers] = useState()
  const updateUsers = useCallback(
    async function () {
      if (lastCancel.current) {
        lastCancel.current()
      }
      const { request, cancel } = getUsers(keyword.toLowerCase(), status)
      lastCancel.current = cancel
      const { data } = await request
      lastCancel.current = null
      if (data) {
        setUsers(data)
      }
    },
    [keyword, status, lastCancel]
  )

  useEffect(() => {
    updateUsers()
  }, [updateUsers])
  return {
    updateUsers,
    setUsers,
    users,
    keyword,
    setKeyword,
    status,
    setStatus,
  }
}
