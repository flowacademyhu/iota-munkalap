import React from 'react'
import useWorkSheets from '../hooks/useWorkSheets'
import FilterWorkSheets from './FilterWorkSheets'
import { Link } from 'react-router-dom'
import Button from '../Button'

export default function TableListOfWorkSheets() {
  const { workSheets } = useWorkSheets()

  const { workSheets, workSheetStatus, setworkSheetStatus } = useWorkSheets()

  return (
    <>
      <div className="d-flex flex-row justify-content-around p-5">
        <Link to={`/worksheets/new`}>
          <Button text="Új munkalap létrehozása" moreClassName="w-auto p-1" />
        </Link>
        <FilterWorkSheets
          workSheetstatus={workSheetstatus}
          onStatusChange={setworkSheetStatus}
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
                    <td>{worksheet.typeOfWork}</td>
                    <td>{worksheet.worksheetStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
