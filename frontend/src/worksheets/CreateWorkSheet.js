import React, { useState } from 'react';
import { postWorkSheet } from '../api/WorkSheetAPI';
import { PATH_VARIABLES } from './Const';
import CreateWorkSheetForm from './CreateWorkSheetForm';

function CreateWorkSheet() {
  
  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  let history = useHistory();

  function handleClick() {
    setSent(false);
    sentSuccessfully 
    ? history.push(`/${PATH_VARIABLES.BASEPATH_WORKSHEET}`) 
    : history.push(`/${PATH_VARIABLES.BASEPATH_WORKSHEET}/${PATH_VARIABLES.ENDPATH1_WORKSHEET}`)
  }

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
      handleClick={handleClick}
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
