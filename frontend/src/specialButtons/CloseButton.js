import React from 'react'
import { FileLockFill } from 'react-bootstrap-icons'

function CloseButton({ onClick }) {
  return <FileLockFill onClick={onClick} className="editIcon closeIcon" />
}

export default CloseButton
