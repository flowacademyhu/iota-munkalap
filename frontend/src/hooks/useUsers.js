import { useState, useEffect } from 'react';
import { getUsers } from '../UserAPI';

export default function useUsers(status) {
  const [users, setUsers] = useState();
  useEffect(() => {
    async function updatePosts() {
      const { data } = await getUsers(status);
      setUsers(data);
    }
    updatePosts();
  }, []);
  return {
    users
  }
}