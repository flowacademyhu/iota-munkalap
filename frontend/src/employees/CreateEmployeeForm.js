import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import PopUp from '../PopUp';

const schema = yup.object().shape({
  lastName: yup
    .string()
    .required("A vezetéknév kötelező!"),
  firstName: yup
    .string()
    .required("A keresztnév kötelező!"),
  email: yup
    .string()
    .required("Az email kötelező!")
    .email("Nem megfelelő email cím!"),
  password: yup
    .string()
    .required("A jelszó kötelező!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "A jelszó minimum 8 karakter hosszú, tartalmaznia kell kis- és nagybetűt, valamint számot!"
    ),
  confirmPassword: yup
    .string()
    .required("Add meg a jelszót még egyszer!")
    .oneOf([yup.ref("password")], "A két jelszó nem egyezik meg!")
});

function CreateEmployeeForm({ sent, setSent, sentSuccessfully, popUpMessage, sendData, path, title }) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent
            && <PopUp
              body={popUpMessage}
              sentSuccessfully={sentSuccessfully}
              setSent={setSent}
              path={path}
            />}
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={schema}
            onSubmit={values => {
              sendData(values);
            }}
          >
            <Form>
              <h1 className='text-center'>{title}</h1>
              <Input name='lastName' label='Vezetéknév' type='text' />
              <Input name='firstName' label='Keresztnév' type='text' />
              <Input name='email' label='E-mail' type='email' />
              <Input name='password' label='Jelszó' type='password' />
              <Input name='confirmPassword' label='Jelszó még egyszer' type='password' />
              <div className='buttons'>
                <Link to='/employees'>
                  <Button text='Mégse' moreClassName='h-auto' />
                </Link>
                <Button text='Mentés' type='submit' moreClassName='h-auto' />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div >
  )
}

export default CreateEmployeeForm;
