import React from 'react'
import Select from 'react-select'

function SelectPartner({ setFieldValue, options }) {
  const handleChange = (value) => {
    setFieldValue('partnerId', value)
  }

  return <Select options={options} onChange={handleChange} />
}

export default SelectPartner
