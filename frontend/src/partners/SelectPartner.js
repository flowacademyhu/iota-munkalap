import React, { useState } from 'react'
import Select from 'react-select'
import { useField } from 'formik'

function SelectPartner({ setFieldValue, options, ...props }) {
  const [showError, setShowError] = useState(false)
  const { error } = useField(props)[1]
  const { name } = props

  const handleChange = (partner) => {
    setFieldValue('partnerId', partner.partnerId)
  }

  const handleBlur = () => {
    setShowError(true)
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>Partner</label>
      <Select
        id={name}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Partner neve"
        className={`${showError ? 'is-invalid' : ''}`}
      />
      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default SelectPartner
