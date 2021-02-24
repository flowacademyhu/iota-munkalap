import React from 'react'
import UpdateWorksheetForm from './UpdateWorkSheetForm'
import useWorksheetData from '../hooks/useWorksheetData'

function UpdateWorksheet() {
  const {
    HandleData,
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
          sendData={HandleData}
          title="Adatok módosítása"
          worksheet={worksheetData}
        />
      )}
    </>
  )
}

export default UpdateWorksheet
