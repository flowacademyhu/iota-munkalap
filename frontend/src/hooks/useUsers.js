import { useState, useEffect } from 'react'
import { getUsers } from '../api/UserAPI'

<<<<<<< HEAD
function useUsers() {
  const [users, setUsers] = useState()
  useEffect(() => {
    async function updateUsers() {
      const { data } = await getUsers()
      setUsers(data)
    }
    updateUsers()
  }, [])
  return {
    users,
    setUsers,
  }
}

export default useUsers
=======
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
>>>>>>> master
