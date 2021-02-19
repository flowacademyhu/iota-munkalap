import { useState, useEffect, useCallback } from 'react'
import { getUsers } from '../api/UserAPI'

export default function useUsers() {
  const [keyword, setKeyword] = useState('')
  const [users, setUsers] = useState()
  const updateUsers = useCallback(
    async function () {
      const { data } = await getUsers(keyword.toLowerCase())
      setUsers(data)
    },
    [keyword]
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
  }
}
