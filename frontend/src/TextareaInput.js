import React from 'react'
import Form from 'react-bootstrap/Form'
import { useField } from 'formik'

export default function TextareaInput({
  handleChange,
  label,
  container,
  ...props
}) {
  const [field, meta] = useField(props)
  const { error, touched } = meta
  const showError = touched && error

  return (
    <div className="form-group my-4">
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          {...field}
          as="textarea"
          custom
          className={`form-control ${showError ? 'is-invalid' : ''}`}
          maxLength="3000"
          rows={4}
        />
        {showError && <div className="invalid-feedback">{error}</div>}
      </Form.Group>
    </div>
  )
}
