import { useState, useEffect } from 'react';
import { getUsers } from '../UserAPI';

export default function useUsers() {
  const [user, setUser] = useState();
  useEffect(() => {
    async function updatePosts() {
      const { data } = await getUsers();
      setUser(data);
    }
    updatePosts();
  }, []);
  return {
    user
  }
}