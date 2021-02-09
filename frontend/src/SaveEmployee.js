import React from 'react';
import { Formik, Form } from 'formik';
import Input from './Input';

function SaveEmployee() {
  return (
    <Formik 
     // initialValues={{ name: '', email: '', password: '', password: '' }}
    >
      <Form>
        <h1 className='text-center'>Új munkavállaló</h1>
        <Input name='name' label='Név' type='text' />
        <Input name='email' label='E-mail' type='email' />
        <Input name='password' label='Jelszó' type='password' />
        <Input name='confirmPassword' label='Jelszó még egyszer' type='password' />
      </Form>
    </Formik>
  )
}

export default SaveEmployee;
