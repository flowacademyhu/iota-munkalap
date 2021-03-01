import React from 'react'
import Input from '../Input'

export default function SearchEmployeeInput(props) {
  const { name, keyword, onChangeKeyword } = props

  function handleChange(event) {
    onChangeKeyword(event.target.value)
  }

  return (
    <Input
      value={keyword}
      onChange={(event) => handleChange(event)}
      type="text"
      placeholder="Munkavállaló keresés"
      name={name}
    />
  )
}
