import { useState, useEffect } from 'react';
import { GetUsers } from '../UserAPI';

export default function useUser() {
  const [user, setUser] = useState();
  useEffect(() => {
    async function updatePosts() {
      const { data } = await GetUsers();
      setUser(data);
    }
    updatePosts();
  }, []);
  return {
    user
  }
}