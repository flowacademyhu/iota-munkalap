import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import useEmployees from '../hooks/useEmployees'
import Button from '../Button'
import { updateEmployeeInactive, activateEmployee } from '../api/EmployeeAPI'
import LoadingScreen from '../LoadingScreen'
import SearchEmployeeInput from './SearchEmployeeInput'
import { Formik, Form } from 'formik'
import FilterEmployees from './FilterEmployees'
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

  async function inactivateAndReload(id) {
    await updateEmployeeInactive(id)
    updateEmployees()
  }

  async function activateAndReload(id) {
    await activateEmployee(id)
    updateEmployees()
  }

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-4 d-flex justify-content-center">
          <Link to={`/employees/new`}>
            <Button
              text="Új munkavállaló létrehozása"
              moreClassName="w-auto p-1"
            />
          </Link>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-sm-4 d-flex justify-content-center">
          <Formik className="form-inline">
            <Form>
              <SearchEmployeeInput
                keyword={keyword}
                onChangeKeyword={setKeyword}
                name="searchEmployee"
              />
            </Form>
          </Formik>
        </div>
        <div className="col-sm-4 d-flex justify-content-center">
          <FilterEmployees status={status} onStatusChange={setStatus} />
        </div>
      </div>

      <div className="border border-secondary">
        <div className="container-fluid align-items-center">
          <Table
            className="table table-hover table-striped text-center"
            data-mobile-responsive="true"
          >
            <Thead>
              <Tr>
                <Th scope="col">#</Th>
                <Th scope="col">Név</Th>
                <Th scope="col">E-mail</Th>
                <Th scope="col">Státusz</Th>
                <Th scope="col">Módosítás</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees ? (
                employees.map((employee) => (
                  <EmployeeListRow
                    employee={employee}
                    onInactivate={() => inactivateAndReload(employee.id)}
                    onActivate={() => activateAndReload(employee.id)}
                  />
                ))
              ) : (
                <Tr>
                  <Td colSpan="5">
                    <LoadingScreen />
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
