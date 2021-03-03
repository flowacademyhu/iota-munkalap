import React from 'react'
import { Link } from 'react-router-dom'
import EditButton from '../specialButtons/EditButton'
import FinalizeButton from '../specialButtons/FinalizeButton'
import CloseButton from '../specialButtons/CloseButton'
import PdfButton from '../specialButtons/PdfButton'
import useCurrentEmployee from '../hooks/useCurrentEmployee'

function WorkSheetOperationButtons({
  status,
  id,
  onFinalize,
  onClose,
  onPrint,
}) {
  const { isAdmin } = useCurrentEmployee()

  return (
    <>
      <Link to={`/worksheets/update/${id}`}>
        <EditButton />
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
