import React from 'react';
import { useField } from "formik";

function Input({ label, type, ...props }) {
  const [field, meta] = useField(props);
  const { name } = props;
  const { error, touched } = meta;
  const showError = touched && error;

  return (
    <div className='form-group'>
      <label htmlFor={name} className='label'>{label}:</label>
      <input
        {...field}
        {...props}
        id={name}
        type={type}
        className={`form-control ${showError ? "is-invalid" : ""}`}
      />
      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}


export default Input;
