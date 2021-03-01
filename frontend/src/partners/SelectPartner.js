import React from 'react'
import Select from 'react-select'

function SelectPartner({ setFieldValue, options, name }) {
  const handleChange = (partner) => {
    setFieldValue('partnerId', partner.partnerId)
  }

  return (
    <>
      <label htmlFor={name}>Partner</label>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Partner neve"
      />
    </>
  )
}

export default SelectPartner
