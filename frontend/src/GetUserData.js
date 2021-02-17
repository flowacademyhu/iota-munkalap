import React from 'react';
import { useJwt } from "react-jwt";

function GetUserData() {
  const token = sessionStorage.getItem('token');
  const { decodedToken, isExpired } = useJwt(token);
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

export default GetUserData;