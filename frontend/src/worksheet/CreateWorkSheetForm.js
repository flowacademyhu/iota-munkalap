import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import Input from '../Input';
import Button from '../Button';
import PopUp from '../PopUp';

function CreateWorkSheetForm({ sent, setSent, sentSuccessfully, popUpMessage, sendData, path,
  title, name, email }) {
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
              partner: '',
              typeOfWork: '',
              assetAccounting: '',
              confirmPassword: '',
              description: '',
              usedMaterial: '',

            }}
            validationSchema={schema}
            onSubmit={values => {
              sendData(values);
            }}
          >
            <Form>
              <h1 className='text-center'>{title}</h1>
              <Input name='partner' label='Partner' type='text' />
              <Input name='typeOfWork' label='Munkavégzés jellege' type='email' />
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
    </div >
  )
}

export default CreateWorkSheetForm;
