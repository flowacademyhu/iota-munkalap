import React from 'react'
import { Printer } from 'react-bootstrap-icons'

function PdfButton({ hidden, onClick }) {
  return (
    <Printer onClick={onClick} className={`editIcon ${hidden && 'hidden'}`} />
  )
}

export default PdfButton
