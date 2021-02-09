import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Input from './Input';
import Button from './Button';

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
  return (
    <Formik 
      initialValues={{ 
        name: '', 
        email: '',
        password: '', 
        confirmPassword: '' 
      }}
      validationSchema={schema}
      onSubmit={values => {
        console.log("Küldés:", values);
      }}
    >
      <Form>
        <h1 className='text-center'>Új munkavállaló</h1>
        <Input name='name' label='Név' type='text' />
        <Input name='email' label='E-mail' type='email' />
        <Input name='password' label='Jelszó' type='password' />
        <Input name='confirmPassword' label='Jelszó még egyszer' type='password' />
        <div className='buttons'>
          <Button text='Mégse' />
          <Button text='Mentés' type='submit' />
        </div>
      </Form>
    </Formik>
  )
}

export default SaveEmployee;
