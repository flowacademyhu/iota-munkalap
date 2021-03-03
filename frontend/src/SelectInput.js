import React from 'react'
import Form from 'react-bootstrap/Form'
import { useField } from 'formik'

export default function SelectInput({
  handleChange,
  label,
  container,
  status,
  ...props
}) {
  const [field, meta] = useField(props)
  const { error, touched } = meta
  const showError = touched && error

  let notEditable =
    status === 'REPORTED' || status === 'CLOSED' ? 'true' : 'false'

  return (
    <div className="form-group my-4">
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          //disabled={notEditable}
          {...field}
          as="select"
          custom
          className={`form-control ${showError ? 'is-invalid' : ''}`}
        >
          {container.map((oneItem) => (
            <option key={oneItem.value} value={oneItem.value}>
              {' '}
              {oneItem.label}{' '}
            </option>
          ))}
        </Form.Control>
        {showError && <div className="invalid-feedback">{error}</div>}
      </Form.Group>
    </div>
  )
}
