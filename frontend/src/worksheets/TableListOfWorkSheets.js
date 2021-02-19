import React from 'react'
import useWorkSheetsWithNumber from '../hooks/useWorkSheetsWithNumber'
import { Link } from 'react-router-dom'
import Button from '../Button'

export default function TableListOfWorkSheets() {
  const { workSheetsWithNumber } = useWorkSheetsWithNumber()

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
              {workSheetsWithNumber ? (
                workSheetsWithNumber.map((worksheet) => (
                  <tr key={worksheet.listId}>
                    <th scope="row">{worksheet.listId}</th>
                    <td>
                      {worksheet.givenData.createdBy.lastName}{' '}
                      {worksheet.givenData.createdBy.firstName}
                    </td>
                    <td>{worksheet.givenData.createdAt}</td>
                    <td>{worksheet.givenData.partnerId}</td>
                    <td>{worksheet.givenData.typeOfWork}</td>
                    <td>{worksheet.givenData.worksheetStatus}</td>
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
