import React from 'react'
import UpdateWorksheetForm from './UpdateWorkSheetForm'
import useWorksheetData from '../hooks/useWorksheetData'
import useFetchWorkSheet from '../hooks/useFetchWorkSheet'

function UpdateWorksheet() {
  const { postData, handleClick, popUpMessage, sent } = useWorksheetData()
  const {
    worksheetData,
    fetchPopUpMessage,
    fetchSent,
    putData,
  } = useFetchWorkSheet()

  if (window.location.pathname === '/worksheets/new') {
    return (
      <>
        <UpdateWorksheetForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={postData}
          title="Adatok módosítása"
        />
        )
      </>
    )
  } else {
    return (
      <>
        {worksheetData.loaded && (
          <UpdateWorksheetForm
            handleClick={handleClick}
            sent={fetchSent}
            popUpMessage={fetchPopUpMessage}
            sendData={putData}
            title="Adatok módosítása"
            worksheet={worksheetData}
          />
        )}
      </>
    )
  }
}

export default UpdateWorksheet
