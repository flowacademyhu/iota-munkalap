import React from 'react'
import { CheckSquare } from 'react-bootstrap-icons'

function FinalizeButton({ onClick, hidden }) {
  return (
    <CheckSquare
      onClick={onClick}
      className={'editIcon finalizeIcon' + (hidden ? ' hidden' : '')}
    />
  )
}

export default FinalizeButton
