import React from 'react'
import useWorkSheets from '../hooks/useWorkSheets'
import EditButton from '../EditButton'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { typeOfWork, status } from '../TranslationForWorkSheet'
import LoadingScreen from '../LoadingScreen'

export default function TableListOfWorkSheets() {
  const { workSheets } = useWorkSheets()

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
                    <td>
                      <div className="d-flex justify-content-around">
                        {status[worksheet.worksheetStatus]}
                        <Link to={`/worksheets/update/${worksheet.id}`}>
                          <EditButton />
                        </Link>
                      </div>
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
