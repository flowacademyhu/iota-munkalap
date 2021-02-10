import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import { putUser, getUser } from '../UserAPI';
import { useParams } from 'react-router-dom';

function UpdateEmployee() {
  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  useEffect(async () => {
    try {
      const response = await getUser(id);
      if (response.status === 200) {
        setUserData({ name: response.data.name, email: response.data.email, loaded: true });
      } else {
        setUserData({ name: '', email: '', loaded: true });
      }
    } catch (error) {
      setUserData({ name: '', email: '', loaded: true });
    }
  }, []);

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
        <EmployeeForm
          sent={sent}
          setSent={setSent}
          sentSuccessfully={sentSuccessfully}
          popUpMessage={popUpMessage}
          sendData={putData}
          path='update'
          title='Adatok módosítása'
          name={userData.name}
          email={userData.email}
        />}
    </>
  );
}

export default UpdateEmployee;
