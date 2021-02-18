import { useState, useEffect } from 'react'
import { getUsers } from '../api/UserAPI'

export default function useUsers() {
  const [keyword, setKeyword] = useState('')

  const [users, setUsers] = useState()
  useEffect(() => {
    async function updateUsers() {
      const { data } = await getUsers(keyword.toLowerCase())
      setUsers(data)
    }
    updateUsers()
  }, [keyword])
  return {
    users,
    keyword,
    setKeyword,
  }
}
