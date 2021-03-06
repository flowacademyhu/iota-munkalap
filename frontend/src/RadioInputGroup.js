import React from 'react'
import Form from 'react-bootstrap/Form'
import { useField } from 'formik'
import RadioInput from './RadioInput'
import { Row, Col } from 'react-bootstrap'

export default function RadioInputGroup({ label, options, ...props }) {
  const [field, meta] = useField(props)
  const { error, touched } = meta
  const showError = touched && error

  return (
    <fieldset>
      <Form.Group as={Row} className="d-flex flex-column">
        <Form.Label as="legend" column sm={4}>
          {label}
        </Form.Label>
        <Col
          sm={5}
          className={`form-control border-white d-flex  ${
            showError ? 'is-invalid' : ''
          }`}
        >
          {options.map((oneItem) => (
            <RadioInput
              {...field}
              key={oneItem.value}
              label={oneItem.label}
              value={oneItem.value}
              checked={field.value === oneItem.value}
            />
          ))}
        </Col>
        {showError && <div className="invalid-feedback">{error}</div>}
      </Form.Group>
    </fieldset>
  )
}
