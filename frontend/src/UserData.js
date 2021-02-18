import React from 'react';
import GetDecodedToken from './GetDecodedToken';

function UserData() {
  const decodedToken = GetDecodedToken();
  return (
    <>
      <div>{decodedToken?.name || ''}</div>
      <div>{decodedToken?.email || ''}</div>
    </>
  );
}

export default UserData;
