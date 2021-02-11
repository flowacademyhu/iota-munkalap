import React, { useState } from 'react';
import { postUser } from '../UserAPI';
import CreateEmployeeForm from './CreateEmployeeForm';

function CreateEmployee() {
  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  async function postData(values) {
    try {
      const response = await postUser(values);
      if (response.status === 201) {
        setPopUpMessage('Munkavállaló sikeresen létrehozva');
        setSentSuccessfully(true);
      } else {
        setPopUpMessage('A létrehozás sikertelen');
      }
    } catch (error) {
      setPopUpMessage('A létrehozás sikertelen');
    }
    setSent(true);
  }

  return (
    <CreateEmployeeForm 
      sent={sent} 
      setSent={setSent} 
      sentSuccessfully={sentSuccessfully} 
      popUpMessage={popUpMessage} 
      sendData={postData}
      path='new'
      title='Új munkatárs létrehozása'
      newEmployee={true}
    />
  );
}

export default CreateEmployee;
