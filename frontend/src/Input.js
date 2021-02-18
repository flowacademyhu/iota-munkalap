import React from 'react'
import { useField } from 'formik'

function Input({ label, type, placeholder, ...props }) {
  const [field, meta] = useField(props)
  const { name } = props
  const { error, touched } = meta
  const showError = touched && error

  return (
    <div className="form-group my-4">
      <label htmlFor={name}>{label}:</label>
      <input
        {...field}
        {...props}
        id={name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${showError ? 'is-invalid' : ''}`}
      />
      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default Input
