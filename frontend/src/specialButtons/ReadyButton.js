import React from 'react'
import { CheckSquare } from 'react-bootstrap-icons'

function ReadyButton({ onClick }) {
  return <CheckSquare onClick={onClick} className="editIcon readyIcon" />
}

export default ReadyButton
