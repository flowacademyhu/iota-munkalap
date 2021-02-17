import React, { useState } from 'react';
import { postWorkSheet } from '../api/WorkSheetAPI';
import CreateWorkSheetForm from './CreateWorkSheetForm';

function CreateWorkSheet({path, basePath, }) {
  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  async function postData(values) {
    try {
      const response = await postWorkSheet(values);
      if (response.status === 201) {
        setPopUpMessage('Munkalap sikeresen létrehozva');
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
    <CreateWorkSheetForm
      sent={sent} 
      setSent={setSent} 
      sentSuccessfully={sentSuccessfully}
      popUpMessage={popUpMessage} 
      sendData={postData}
      basePath='worksheets'
      path='new'
      title='Új munkalap létrehozása'
    />
  );
}

export default CreateWorkSheet;
