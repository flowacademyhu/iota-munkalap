import React from 'react';
import { useJwt } from "react-jwt";

function UserData() {
  const token = sessionStorage.getItem('token');
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
