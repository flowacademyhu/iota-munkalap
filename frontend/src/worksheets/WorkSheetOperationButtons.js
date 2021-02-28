import React from 'react'
import { useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'
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
  const history = useHistory()

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
      <EditButton
        hidden={!isEditable()}
        onClick={() =>
          history.push(`/${PATH_VARIABLES.WORKSHEET_UPDATE}/${id}`)
        }
      />
      <FinalizeButton hidden={status !== 'CREATED'} onClick={onFinalize} />
      {isAdmin && (
        <CloseButton hidden={status === 'CLOSED'} onClick={onClose} />
      )}
      <PdfButton onClick={onPrint} />
    </>
  )
}

export default WorkSheetOperationButtons
