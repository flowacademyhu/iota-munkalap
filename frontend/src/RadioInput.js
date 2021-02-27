import Form from 'react-bootstrap/Form'

function RadioInput({ label, value, name }) {
  return (
    <Form.Check
      className="ml-4"
      type="radio"
      label={label}
      name={name}
      value={value}
    />
  )
}

export default RadioInput
