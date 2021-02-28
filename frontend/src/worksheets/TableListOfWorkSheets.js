import React from 'react'
import { useHistory } from 'react-router-dom'
import { PATH_VARIABLES } from '../Const'
import useWorkSheets from '../hooks/useWorkSheets'
import FilterWorkSheets from './FilterWorkSheets'
import Button from '../Button'
import {
  typeOfWorkTranslation,
  statusTranslation,
} from './TranslationForWorkSheet'
import LoadingScreen from '../LoadingScreen'
import CalendarDropDown from '../CalendarDropDown'
import WorkSheetOperationButtons from './WorkSheetOperationButtons'

export default function TableListOfWorkSheets() {
  const {
    workSheets,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    status,
    setStatus,
  } = useWorkSheets()

  const history = useHistory()

  return (
    <>
      <div className="py-1">
        <Button
          onClick={() => history.push(`/${PATH_VARIABLES.WORKSHEET_NEW}`)}
          text="Új munkalap létrehozása"
          moreClassName="w-auto p-1"
        />
      </div>
      <div className="d-flex flex-row justify-content-between">
        <div className="ml-2">
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
                      <WorkSheetOperationButtons worksheet={worksheet} />
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
