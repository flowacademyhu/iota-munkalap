import React from 'react'
import WorksheetForm from './WorksheetForm'
import useWorksheetData from '../hooks/useWorksheetData'
import LoadingScreen from '../LoadingScreen'

export default function Worksheet() {
  const {
    saveWorksheet,
    handleClick,
    popUpMessage,
    sent,
    worksheetData,
  } = useWorksheetData()
  let isCreate = window.location.pathname === '/worksheets/new'
  return isCreate || worksheetData ? (
    <WorksheetForm
      handleClick={handleClick}
      sent={sent}
      popUpMessage={popUpMessage}
      sendData={saveWorksheet}
      title={isCreate ? 'Munkalap létrehozása' : 'Adatok szerkesztése'}
      worksheet={worksheetData}
    />
  ) : (
    <LoadingScreen />
  )
}
