import React from 'react'
import Select from 'react-select'

function SelectPartner({ setFieldValue, options }) {
  const handleChange = (partner) => {
    setFieldValue('partnerId', partner.partnerId)
  }

  return <Select options={options} onChange={handleChange} />
}

export default SelectPartner
