import { useState, useEffect } from 'react';
import { getWorkSheets } from '..api/WorkSheetAPI';

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