import { useState, useEffect } from 'react'
import { getUsers } from '../api/UserAPI'

export default function useUsers() {
  const [users, setUsers] = useState()
  useEffect(() => {
    async function updatePosts() {
      const { data } = await getUsers()
      setUsers(data)
    }
    updatePosts()
  }, [])
  return {
    users,
  }
}
