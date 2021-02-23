import React from 'react'
import { XSquareFill } from 'react-bootstrap-icons'

function CloseButton({ onClick }) {
  return <XSquareFill onClick={onClick} className="editIcon closeIcon" />
}

export default CloseButton
