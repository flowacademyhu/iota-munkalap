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
    .email("Nem megfelelő email cím!")
});

function UpdateEmployeeForm({ sent, handleClick, popUpMessage, sendData, title, user }) {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {sent
            && <PopUp
              handleClick={handleClick}
              body={popUpMessage}
            />}
          <Formik
            initialValues={{
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || ''
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

export default UpdateEmployeeForm;
