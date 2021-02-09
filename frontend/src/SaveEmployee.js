import React from 'react';
import { Formik, Form } from 'formik';
import Input from './Input';
import Button from './Button';

function SaveEmployee() {
  return (
    <Formik 
      initialValues={{ 
        name: '', 
        email: '',
        password: '', 
        confirmPassword: '' 
      }}
      //validationSchema={schema}
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
        <Button text='Mégse' />
        <Button text='Mentés' type='submit' />
      </Form>
    </Formik>
  )
}

export default SaveEmployee;
