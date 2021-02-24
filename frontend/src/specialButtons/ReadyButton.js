import React from 'react'
import { CheckSquare } from 'react-bootstrap-icons'

function ReadyButton({ onClick, hidden }) {
  return (
    <CheckSquare
      onClick={onClick}
      className={'editIcon readyIcon' + (hidden ? ' hidden' : '')}
    />
  )
}

export default ReadyButton
