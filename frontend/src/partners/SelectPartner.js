import React, { useState } from 'react'
import Select from 'react-select'
import { useField } from 'formik'

function SelectPartner({ ...props }) {
  const [showError, setShowError] = useState(false)
  const { error } = useField(props)[1]
  const { setFieldValue, name, options, label, placeholder } = props

  const handleChange = (partner) => {
    setFieldValue('partnerId', partner.partnerId)
  }

  const handleBlur = () => {
    setShowError(true)
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${showError ? 'is-invalid' : ''}`}
      />
      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default SelectPartner
