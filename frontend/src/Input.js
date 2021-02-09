import React from 'react';
import { useField } from "formik";

function Input({ label, type, ...props }) {
  const [field, meta] = useField(props);
  const { name } = props;

  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}:</label>
      <input
        {...field}
        {...props}
        id={name}
        type={type}
        className='inputfield' />
    </div>
  );
}


export default Input;
