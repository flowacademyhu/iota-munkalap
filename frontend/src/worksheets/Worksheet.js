import React from 'react'
import WorksheetForm from './WorksheetForm'
import useWorksheetData from '../hooks/useWorksheetData'

export default function Worksheet() {
  const {
    HandleData,
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
        sendData={HandleData}
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
          sendData={HandleData}
          title="Adatok szerkesztése"
          worksheet={worksheetData}
        />
      )}
    </>
  )
}
