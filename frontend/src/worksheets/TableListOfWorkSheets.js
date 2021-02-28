import React from 'react'
import useWorkSheets from '../hooks/useWorkSheets'
import FilterWorkSheets from './FilterWorkSheets'
import EditButton from '../specialButtons/EditButton'
import { Link } from 'react-router-dom'
import Button from '../Button'
import {
  typeOfWorkTranslation,
  statusTranslation,
} from './TranslationForWorkSheet'
import useCurrentUser from '../hooks/useCurrentUser'
import CloseButton from '../specialButtons/CloseButton'
import { closeWorkSheet, finalizeWorkSheet } from '../api/WorkSheetAPI'
import LoadingScreen from '../LoadingScreen'
import workSheetPDF from './workSheetPDF'
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
    status,
    setStatus,
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
      <div className="py-1 my-3">
        <Link to={`/worksheets/new`}>
          <Button text="Új munkalap létrehozása" moreClassName="w-auto p-1" />
        </Link>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <div className="ml-2 d-flex flex-column">
          <div className="d-block col-sm-">Szűrés dátum szerint:</div>
          <div className="ml-2 d-flex flex-row my-3">
            <span>
              <CalendarDropDown
                date={startDate}
                setDate={setStartDate}
                placeholderText="Intervallum kezdete"
              />{' '}
            </span>
            <span>
              <CalendarDropDown
                date={endDate}
                setDate={setEndDate}
                placeholderText="Intervallum vége"
              />{' '}
            </span>
            <span>
              <Button
                text="Összes"
                onClick={() => {
                  setStartDate(null)
                  setEndDate(null)
                }}
              />
            </span>
          </div>
        </div>
        <div className="mr-2">
          <div>Szűrés állapot szerint:</div>
          <FilterWorkSheets status={status} onStatusChange={setStatus} />
        </div>
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
                    <td>{typeOfWorkTranslation[worksheet.typeOfWork]}</td>
                    <td>{statusTranslation[worksheet.worksheetStatus]}</td>
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
                      <PdfButton
                        hidden={worksheet.worksheetStatus === 'CREATED'}
                        onClick={() => workSheetPDF(worksheet)}
                      />
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
