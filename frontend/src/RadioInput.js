import { useState } from 'react'
import Form from 'react-bootstrap/Form'

function RadioInput({ label, value, name, response }) {
  const [selectedValue, setSelectedValue] = useState(value)

  const handleChange = (e) => {
    setSelectedValue(e.currentTarget.value)
  }

  return (
    <Form.Check
      className="ml-4"
      type="radio"
      label={label}
      name={name}
      value={selectedValue}
      defaultChecked={response && value === response}
      onChange={(e) => handleChange(e)}
    />
  )
}

export default RadioInput
