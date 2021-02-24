import React from 'react'
import { FileLockFill } from 'react-bootstrap-icons'

function CloseButton({ onClick, hidden }) {
  return (
    <FileLockFill
      onClick={onClick}
      className={'editIcon closeIcon' + (hidden ? ' hidden' : '')}
    />
  )
}

export default CloseButton
