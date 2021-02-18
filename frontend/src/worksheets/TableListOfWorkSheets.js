import React from 'react'
import useWorkSheets from '../hooks/useWorkSheets'
import { Link } from 'react-router-dom'
import Button from '../Button'

export default function TableListOfWorkSheets() {
  const { workSheets } = useWorkSheets()
  return (
    <>
      <div className="d-flex justify-content-between p-5">
        <Link to={`/worksheets/new`}>
          <Button text="Új munkalap létrehozása" />
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
                workSheets.map((worksheet) => (
                  <tr key={worksheet.id}>
                    <th scope="row">{worksheet.id}</th>
                    <td>{worksheet.creater}</td>
                    <td>{worksheet.date}</td>
                    <td>{worksheet.partner}</td>
                    <td>{worksheet.type}</td>
                    <td>{worksheet.state}</td>
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
