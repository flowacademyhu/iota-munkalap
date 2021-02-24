import React from 'react'
import useWorkSheets from '../hooks/useWorkSheets'
import EditButton from '../specialButtons/EditButton'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { typeOfWork, status } from '../TranslationForWorkSheet'
import useCurrentUser from '../hooks/useCurrentUser'
import CloseButton from '../specialButtons/CloseButton'
import { closeWorkSheet, readyWorkSheet } from '../api/WorkSheetAPI'
import LoadingScreen from '../LoadingScreen'
import ReadyButton from '../specialButtons/ReadyButton'

export default function TableListOfWorkSheets() {
  const { workSheets, updateWorkSheets } = useWorkSheets()
  const { isAdmin } = useCurrentUser()

  async function closeAndReload(worksheet) {
    await closeWorkSheet(worksheet.id)
    updateWorkSheets()
  }

  async function readyAndReload(worksheet) {
    await readyWorkSheet(worksheet.id)
    updateWorkSheets()
  }

  return (
    <>
      <div className="d-flex justify-content-between p-1">
        <Link to={`/worksheets/new`}>
          <Button text="Új munkalap létrehozása" moreClassName="w-auto p-1" />
        </Link>
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
                    <th scope="row">{index + 1}</th>
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
                      {isAdmin && worksheet.worksheetStatus === 'CREATED' && (
                        <ReadyButton
                          onClick={() => readyAndReload(worksheet)}
                        />
                      )}
                      {isAdmin && worksheet.worksheetStatus !== 'CLOSED' && (
                        <CloseButton
                          onClick={() => closeAndReload(worksheet)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <td colspan="5">
                  <LoadingScreen />
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
