import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import PopUp from './PopUp';
import { postUser } from './UserAPI';

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Az email kötelező!")
    .email("Nem megfelelő email cím!"),
  password: yup
    .string()
    .required("A jelszó kötelező!")
    .min(5, "Legalább 5 karakteres jelszó kell!"),
  confirmPassword: yup
    .string()
    .required("Add meg a jelszót még egyszer!")
    .oneOf([yup.ref("password")], "A két jelszó nem egyezik meg!")
});

function SaveEmployee() {
  const [send, setSend] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  async function postData(values) {
    try {
      const response = await postUser(values);
      if (response.status === 201) {
        setPopUpMessage('Munkavállaló sikeresen létrehozva');
      } else {
        setPopUpMessage('A létrehozás sikertelen');
      }
    } catch (error) {
      setPopUpMessage('A létrehozás sikertelen');
    }
    setSend(true);
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {send && <PopUp body={popUpMessage} />}
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={schema}
            onSubmit={values => {
              postData(values);
            }}
          >
            <Form>
              <h1 className='text-center'>Új munkavállaló</h1>
              <Input name='name' label='Név' type='text' />
              <Input name='email' label='E-mail' type='email' />
              <Input name='password' label='Jelszó' type='password' />
              <Input name='confirmPassword' label='Jelszó még egyszer' type='password' />
              <div className='buttons'>
                <Link to='/employees'>
                  <Button text='Mégse' />
                </Link>
                <Button text='Mentés' type='submit' />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default SaveEmployee;
