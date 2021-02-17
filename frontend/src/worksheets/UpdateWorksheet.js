import React, { useState, useEffect } from 'react';
import UpdateWorksheetForm from './UpdateWorksheetForm';
import { putWorksheet, getWorksheets } from '../api/WorksheetAPI';
import { useParams } from 'react-router-dom';

function UpdateWorksheet() {
  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const { id } = useParams();
  const [worksheetData, setWorksheetData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getWorksheets(id);
        setWorksheetData({ ...response.data, loaded: true });
      } catch (error) {
        setWorksheetData({ loaded: true });
        setPopUpMessage('A módosítás sikertelen');
        setSent(true);
      }
    }
    fetchData();
  }, [id]);

  async function putData(values) {
    try {
      const response = await putWorksheet(id, values);
      if (response.status === 200) {
        setPopUpMessage('Munkalap sikeresen módosítva');
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
    <>
      {worksheetData.loaded &&
        <UpdateWorksheetForm
          sent={sent}
          setSent={setSent}
          sentSuccessfully={sentSuccessfully}
          popUpMessage={popUpMessage}
          sendData={putData}
          tablePath='worksheets'
          path='update'
          title='Adatok módosítása'
          worksheet={worksheetData}
        />}
    </>
  );
}

export default UpdateWorksheet;
