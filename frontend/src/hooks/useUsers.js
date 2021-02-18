import { useState, useEffect } from 'react';
import { getUsers } from '../api/UserAPI';

function useUsers() {
  const [users, setUsers] = useState();
  useEffect(() => {
    async function updateUsers() {
      const { data } = await getUsers();
      setUsers(data);
    }
    updateUsers();
  }, []);
  return {
    users,
    setUsers
  }
}

export default useUsers;