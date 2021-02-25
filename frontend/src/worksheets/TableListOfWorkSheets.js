import React from 'react'
import useWorkSheets from '../hooks/useWorkSheets'
import EditButton from '../specialButtons/EditButton'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { typeOfWork, status } from '../TranslationForWorkSheet'
import useCurrentUser from '../hooks/useCurrentUser'
import CloseButton from '../specialButtons/CloseButton'
import { closeWorkSheet, finalizeWorkSheet } from '../api/WorkSheetAPI'
import LoadingScreen from '../LoadingScreen'
import WorkSheetPDF from './WorkSheetPDF'
import PdfButton from '../specialButtons/PdfButton'
import FinalizeButton from '../specialButtons/FinalizeButton'
import CalendarDropDown from '../CalendarDropDown'

export default function TableListOfWorkSheets() {
  const {
    workSheets,
    updateWorkSheets,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useWorkSheets()
  const { isAdmin } = useCurrentUser()

  async function closeAndReload(worksheet) {
    await closeWorkSheet(worksheet.id)
    updateWorkSheets()
  }

  async function finalizeAndReload(worksheet) {
    await finalizeWorkSheet(worksheet.id)
    updateWorkSheets()
  }

  return (
    <>
      <div className="d-flex justify-content-between p-1">
        <Link to={`/worksheets/new`}>
          <Button text="Új munkalap létrehozása" moreClassName="w-auto p-1" />
        </Link>
      </div>
      <div>Szűrés dátum szerint:</div>
      <div>
        <CalendarDropDown
          date={startDate}
          setDate={setStartDate}
          placeholderText="Intervallum kezdete"
        />
        <CalendarDropDown
          date={endDate}
          setDate={setEndDate}
          placeholderText="Intervallum vége"
        />
        <Button
          text="Összes"
          onClick={() => {
            setStartDate(null)
            setEndDate(null)
          }}
        />
      </div>
      <div className="border border-secondary">
        <div className="container-fluid">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Létrehozó munkatárs</th>
                <th scope="col">Felvétel időpontja</th>
                <th scope="col">Partner neve</th>
                <th scope="col">Munkavégzés jellege</th>
                <th scope="col">Állapot</th>
                <th scope="col">Módosítás</th>
              </tr>
            </thead>
            <tbody>
              {workSheets ? (
                workSheets.map((worksheet, index) => (
                  <tr key={index}>
                    <th scope="row">{worksheet.id}</th>
                    <td>
                      {worksheet.createdBy.lastName}{' '}
                      {worksheet.createdBy.firstName}
                    </td>
                    <td>{worksheet.createdAt}</td>
                    <td>{worksheet.partnerId}</td>
                    <td>{typeOfWork[worksheet.typeOfWork]}</td>
                    <td>{status[worksheet.worksheetStatus]}</td>
                    <td>
                      <Link to={`/worksheets/update/${worksheet.id}`}>
                        <EditButton />
                      </Link>
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
                      <Link to={`/worksheets/update/${worksheet.id}`}>
                        <EditButton />
                      </Link>
                      <Link onClick={() => WorkSheetPDF(worksheet)}>
                        <PdfButton />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <LoadingScreen />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
