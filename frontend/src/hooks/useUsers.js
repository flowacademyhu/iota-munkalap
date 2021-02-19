import { useState, useEffect } from 'react'
import { getUsers } from '../api/UserAPI'

export default function useUsers() {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState(null)

  const [users, setUsers] = useState()
  useEffect(() => {
    async function updateUsers() {
      const { data } = await getUsers(keyword.toLowerCase(), status)
      setUsers(data)
    }
    updateUsers()
  }, [keyword, status])
  return {
    users,
    keyword,
    setKeyword,
    status,
    setStatus,
  }
}
