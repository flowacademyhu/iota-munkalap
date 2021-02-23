import React from 'react'
import UpdateWorksheetForm from './UpdateWorkSheetForm'
import useWorksheetData from '../hooks/useWorksheetData'

function UpdateWorksheet() {
  const {
    putData,
    handleClick,
    worksheetData,
    popUpMessage,
    sent,
  } = useWorksheetData()

  return (
    <>
      {worksheetData.loaded && (
        <UpdateWorksheetForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={putData}
          title="Adatok módosítása"
          worksheet={worksheetData}
        />
      )}
    </>
  )
}

export default UpdateWorksheet
