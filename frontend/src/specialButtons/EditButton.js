import React from 'react'
import { PencilSquare } from 'react-bootstrap-icons'

function EditButton({ onClick }) {
  return <PencilSquare onClick={onClick} className="editIcon text-primary" />
}

export default EditButton
