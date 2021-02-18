import { useState, useEffect } from 'react'
import { getUsers } from '../api/UserAPI'

export default function useUsers() {
  const [keyword, setKeyword] = useState('')

  const [users, setUsers] = useState()
  useEffect(() => {
    async function updatePosts() {
      const { data } = await getUsers(keyword.toLowerCase())
      setUsers(data)
    }
    updatePosts()
  }, [keyword])
  return {
    users,
    keyword,
    setKeyword,
  }
}
