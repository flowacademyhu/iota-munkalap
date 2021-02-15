import { useState, useEffect } from 'react';
import { getWorkSheets } from '../UserAPI';

export default function useUsers() {
  const [workSheets, setWorkSheets] = useState();
  useEffect(() => {
    async function updatePosts() {
      const { data } = await getWorkSheets();
      setWorkSheets(data);
    }
    updatePosts();
  }, []);
  return {
    workSheets
  }
}