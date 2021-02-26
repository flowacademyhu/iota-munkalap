import React from 'react'
import useEmployees from '../hooks/useEmployees'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { putUserInactive } from '../api/UserAPI'
import LoadingScreen from '../LoadingScreen'
import SearchEmployeeInput from './SearchEmployeeInput'
import { Formik, Form } from 'formik'
import FilterUsers from './FilterUsers'
import EmployeeListRow from './EmployeeListRow'

export default function TableListOfEmployees() {
  const {
    employees,
    keyword,
    setKeyword,
    updateEmployees,
    status,
    setStatus,
  } = useEmployees()

  async function updater(employee) {
    await putEmployeeInactive(employee.id)
    updateEmployees()
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-around p-5">
        <Link to={`/employees/new`}>
          <Button
            text="Új munkavállaló létrehozása"
            moreClassName="w-auto p-1"
          />
        </Link>
        <Formik className="form-inline">
          <Form>
            <SearchEmployeeInput
              keyword={keyword}
              onChangeKeyword={setKeyword}
              label="Munkatárs keresése"
              name="searchEmployee"
            />
          </Form>
        </Formik>
        <FilterUsers status={status} onStatusChange={setStatus} />
      </div>
      <div className="border border-secondary">
        <div className="container-fluid align-items-center">
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Név</th>
                <th scope="col">E-mail</th>
                <th scope="col">Státusz</th>
                <th scope="col">Módosítás</th>
              </tr>
            </thead>
            <tbody>
              {employees ? (
                employees.map((employee) => (
                  <EmployeeListRow
                    employee={employee}
                    key={employee.id}
                    onInactivate={() => updater(employee)}
                  />
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
