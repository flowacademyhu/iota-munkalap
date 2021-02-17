import React from 'react';
import { useJwt } from "react-jwt";
import useToken from './hooks/useToken'

function UserData() {
  const { token } = useToken();
  const { decodedToken } = useJwt(token);
  if (decodedToken) {
    return (
      <>
        <div>{decodedToken.name}</div>
        <div>{decodedToken.email}</div>
      </>
    );
  }
  else {
    return <div></div>
  }
}

export default UserData;
