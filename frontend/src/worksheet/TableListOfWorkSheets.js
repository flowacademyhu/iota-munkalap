import React from 'react';
import useWorkSheets from '../hooks/useWorkSheets';
import { Link } from 'react-router-dom';
import EditButton from '../EditButton';
import Button from '../Button';
import { putUserInactive } from '../api/UserAPI';
import { Formik, Form } from "formik";


export default function TableListOfWorkSheets() {
  const { workSheets } = useWorkSheets();

  return (
    <>
      <div className="d-flex justify-content-between p-5">
        <Link to={`/worksheets/new`}>
          <Button className="h-auto" text='Új munkalap léptrehozása' />
        </Link>
      </div>
      <div className="border border-secondary">
        <div className="container-fluid">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Név</th>
                <th scope="col">E-mail</th>
                <th scope="col">Aktiv</th>
              </tr>
            </thead>
            <tbody>
              {workSheets ? (
                workSheets.map(workSheet => (
                  <tr key={workSheet.id}>
                    <th scope="row">{workSheet.id}</th>
                    <td>{workSheet.name}</td>
                    <td>{workSheet.email}</td>
                  </tr>
                )))
                :
                <tr>
                  <td>Loading...</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}