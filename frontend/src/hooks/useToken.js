import { useState} from 'react';

export default function useToken() {
  function getToken () {
    const responseStr = sessionStorage.getItem('token');
    const responseToken = JSON.parse(responseStr);
    return responseToken?.access_token
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