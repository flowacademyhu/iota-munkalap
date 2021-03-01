import React, { useState } from 'react'
import Select from 'react-select'

const options = [
  { value: 'blues', label: 'Blues' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'orchestra', label: 'Orchestra' },
  { value: 'disco', label: 'Disco' },
]

function SelectPartner() {
  const [selectedOption, setSelectedOption] = useState(null)

  const handleChange = (selected) => {
    setSelectedOption(selected)
    console.log(`Option selected:`, selected)
  }

  return (
    <Select options={options} onChange={(selected) => handleChange(selected)} />
  )
}

export default SelectPartner
