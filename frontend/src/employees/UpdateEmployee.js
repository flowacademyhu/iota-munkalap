import React, { useState, useEffect } from 'react';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import { putUser, getUser } from '../api/UserAPI';
import { useParams } from 'react-router-dom';

function UpdateEmployee() {
  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUser(id);
        setUserData({ ...response.data, loaded: true });
      } catch (error) {
        setUserData({ loaded: true });
        setPopUpMessage('A módosítás sikertelen');
        setSent(true);
      }
    }
    fetchData();
  }, [id]);

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
    <>
      {userData.loaded &&
        <UpdateEmployeeForm
          sent={sent}
          setSent={setSent}
          sentSuccessfully={sentSuccessfully}
          popUpMessage={popUpMessage}
          sendData={putData}
          path='update'
          title='Adatok módosítása'
          user={userData}
        />}
    </>
  );
}

export default UpdateEmployee;
