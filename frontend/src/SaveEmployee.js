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
      </Form>
    </Formik>
  )
}

export default SaveEmployee;
