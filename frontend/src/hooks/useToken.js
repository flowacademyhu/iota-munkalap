import { useState } from 'react';

export default function useToken() {

  function getToken() {
    return sessionStorage.getItem('token');
  }

  const [token, setToken] = useState(getToken());

  function saveToken(token) {
    sessionStorage.setItem('token', token);
    setToken(token);
  };

  return {
    setToken: saveToken,
    token
  }
}