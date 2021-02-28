import React from 'react'
import { useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'
import EditButton from '../specialButtons/EditButton'
import FinalizeButton from '../specialButtons/FinalizeButton'
import CloseButton from '../specialButtons/CloseButton'
import PdfButton from '../specialButtons/PdfButton'
import workSheetPDF from './workSheetPDF'
import useCurrentUser from '../hooks/useCurrentUser'
import useWorkSheets from '../hooks/useWorkSheets'
import { closeWorkSheet, finalizeWorkSheet } from '../api/WorkSheetAPI'

function WorkSheetOperationButtons({ worksheet }) {
  const { updateWorkSheets } = useWorkSheets()
  const { isAdmin } = useCurrentUser()
  const history = useHistory()

  async function closeAndReload() {
    await closeWorkSheet(worksheet.id)
    updateWorkSheets()
  }

  async function finalizeAndReload() {
    await finalizeWorkSheet(worksheet.id)
    updateWorkSheets()
  }

  const isEditable = () => {
    if (worksheet.worksheetStatus === 'CREATED') {
      return true
    }
    if (worksheet.worksheetStatus === 'CLOSED') {
      return false
    }
    if (worksheet.worksheetStatus === 'REPORTED') {
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
          history.push(`/${PATH_VARIABLES.WORKSHEET_UPDATE}/${worksheet.id}`)
        }
      />
      <FinalizeButton
        hidden={worksheet.worksheetStatus !== 'CREATED'}
        onClick={() => finalizeAndReload(worksheet)}
      />
      {isAdmin && (
        <CloseButton
          hidden={worksheet.worksheetStatus === 'CLOSED'}
          onClick={() => closeAndReload(worksheet)}
        />
      )}
      <PdfButton
        hidden={worksheet.worksheetStatus === 'CREATED'}
        onClick={() => workSheetPDF(worksheet)}
      />
    </>
  )
}

export default WorkSheetOperationButtons
