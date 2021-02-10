import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import { putUser } from '../UserAPI';

function UpdateEmployee({id}) {
  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  async function putData(values) {
    try {
      const response = await putUser(id, values);
      if (response.status === 200) {
        setPopUpMessage('Munkavállaló sikeresen módosítva');
        setSentSuccessfully(true);
      } else {
        setPopUpMessage('A módosítás sikertelen');
      }
    } catch (error) {
      setPopUpMessage('A módosítás sikertelen');
    }
    setSent(true);
  }

  return (
    <EmployeeForm 
      sent={sent} 
      setSent={setSent} 
      sentSuccessfully={sentSuccessfully} 
      popUpMessage={popUpMessage} 
      sendData={putData}
      path='update'
      title='Adatok módosítása'
    />
  );
}

export default UpdateEmployee;
