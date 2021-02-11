import { useState} from 'react';

export default function useToken() {
  function getToken () {
    const tokenStr = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenStr);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  function saveToken(token ) {
    sessionStorage.setItem('token', JSON.stringify(token));
    setToken(token);
  };


  return {
    setToken: saveToken,
    token
  }
}