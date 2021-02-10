import { useState} from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenStr = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenStr);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}