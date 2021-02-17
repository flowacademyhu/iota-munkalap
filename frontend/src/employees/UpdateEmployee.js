import React, { useState, useEffect } from 'react';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import { putUser, getUser } from '../api/UserAPI';
import { useParams, useHistory } from 'react-router-dom';
import { PATH_VARIABLES } from '../Const'

function UpdateEmployee() {
  const [sent, setSent] = useState(false);
  const [sentSuccessfully, setSentSuccessfully] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  let history = useHistory();

  function handleClick() {
    setSent(false);
    sentSuccessfully && history.push(`/${PATH_VARIABLES.EMPLOYEE}`)
  }

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
      }
    } catch (error) {
      setPopUpMessage('A módosítás sikertelen');
    } finally {
      setSent(true);
    }
  }

  return (
    <>
      {userData.loaded &&
        <UpdateEmployeeForm
          handleClick={handleClick}
          sent={sent}
          sentSuccessfully={sentSuccessfully}
          popUpMessage={popUpMessage}
          sendData={putData}
          title='Adatok módosítása'
          user={userData}
        />}
    </>
  );
}

export default UpdateEmployee;
