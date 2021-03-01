import React from 'react'
import WorksheetForm from './WorksheetForm'
import useWorksheetData from '../hooks/useWorksheetData'

export default function Worksheet() {
  const {
    saveWorksheet,
    handleClick,
    popUpMessage,
    sent,
    worksheetData,
  } = useWorksheetData()

  return window.location.pathname === '/worksheets/new' ? (
    <>
      <WorksheetForm
        handleClick={handleClick}
        sent={sent}
        popUpMessage={popUpMessage}
        sendData={saveWorksheet}
        title="Munkalap létrehozása"
      />
    </>
  ) : (
    <>
      {worksheetData && (
        <WorksheetForm
          handleClick={handleClick}
          sent={sent}
          popUpMessage={popUpMessage}
          sendData={saveWorksheet}
          title="Adatok szerkesztése"
          worksheet={worksheetData}
        />
      )}
    </>
  )
}
