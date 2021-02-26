import React from 'react'
import { CheckSquareFill } from 'react-bootstrap-icons'

function ActivateButton({ onClick, hidden }) {
  return (
    <CheckSquareFill
      onClick={onClick}
      className={`editIcon text-success ${hidden && 'hidden'}`}
    />
  )
}

export default ActivateButton
