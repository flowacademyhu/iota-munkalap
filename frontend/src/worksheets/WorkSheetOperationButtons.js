import React from 'react'
import { Link } from 'react-router-dom'
import EditButton from '../specialButtons/EditButton'
import FinalizeButton from '../specialButtons/FinalizeButton'
import CloseButton from '../specialButtons/CloseButton'
import PdfButton from '../specialButtons/PdfButton'
import useCurrentUser from '../hooks/useCurrentUser'

function WorkSheetOperationButtons({
  status,
  id,
  onFinalize,
  onClose,
  onPrint,
}) {
  const { isAdmin } = useCurrentUser()

  const isEditable = () => {
    if (status === 'CREATED') {
      return true
    }
    if (status === 'CLOSED') {
      return false
    }
    if (status === 'REPORTED') {
      if (isAdmin) {
        return true
      }
    }
    return false
  }

  return (
    <>
      <Link to={`/worksheets/update/${id}`}>
        <EditButton hidden={!isEditable()} />
      </Link>
      <FinalizeButton hidden={status !== 'CREATED'} onClick={onFinalize} />
      {isAdmin && (
        <CloseButton hidden={status === 'CLOSED'} onClick={onClose} />
      )}
      <PdfButton onClick={onPrint} />
    </>
  )
}

export default WorkSheetOperationButtons
