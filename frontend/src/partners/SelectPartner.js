import React, { useState } from 'react'
import Select from 'react-select'

const options = [
  { value: 'blues', label: 'Blues' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'orchestra', label: 'Orchestra' },
  { value: 'disco', label: 'Disco' },
]

function SelectPartner({ onChange }) {
  const handleChange = (value) => {
    onChange('partnerId', value)
  }

  return <Select options={options} onChange={handleChange} />
}

export default SelectPartner
