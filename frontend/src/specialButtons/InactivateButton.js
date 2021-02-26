import React from 'react'
import { XSquareFill } from 'react-bootstrap-icons'

function InactivateButton({ onClick, hidden }) {
  return (
    <XSquareFill
      onClick={onClick}
      className={`editIcon text-danger ${hidden && 'hidden'}`}
    />
  )
}

export default InactivateButton
