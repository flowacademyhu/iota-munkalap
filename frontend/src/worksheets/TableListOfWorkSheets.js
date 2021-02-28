import React from 'react'
import useWorkSheets from '../hooks/useWorkSheets'
import {
  typeOfWorkTranslation,
  statusTranslation,
} from './TranslationForWorkSheet'
import LoadingScreen from '../LoadingScreen'
import WorkSheetOperationButtons from './WorkSheetOperationButtons'
import { closeWorkSheet, finalizeWorkSheet } from '../api/WorkSheetAPI'
import workSheetPDF from './workSheetPDF'
import FiltersAndNewWorkSheet from './FiltersAndNewWorkSheet'

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

  async function closeAndReload(id) {
    await closeWorkSheet(id)
    updateWorkSheets()
  }

  async function finalizeAndReload(id) {
    await finalizeWorkSheet(id)
    updateWorkSheets()
  }

  return (
    <>
      <FiltersAndNewWorkSheet
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        status={status}
        setStatus={setStatus}
      />
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
                <th scope="col">Műveletek</th>
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
                      <WorkSheetOperationButtons
                        status={worksheet.worksheetStatus}
                        id={worksheet.id}
                        onFinalize={() => finalizeAndReload(worksheet.id)}
                        onClose={() => closeAndReload(worksheet.id)}
                        onPrint={() => workSheetPDF(worksheet)}
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
