import React from 'react'
import { PencilSquare } from 'react-bootstrap-icons'

function EditButton({ onClick, hidden }) {
  return (
    <PencilSquare
      onClick={onClick}
      className={`editIcon text-primary ${hidden && 'hidden'}`}
    />
  )
}

export default EditButton
