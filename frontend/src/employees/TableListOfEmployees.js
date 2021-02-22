import React from 'react'
import useUsers from '../hooks/useUsers'
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
    users,
    keyword,
    setKeyword,
    updateUsers,
    status,
    setStatus,
  } = useUsers()

  async function updater(user) {
    await putUserInactive(user.id)
    updateUsers()
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
        <Formik class="form-inline">
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
              {users ? (
                users.map((user) => (
                  <EmployeeListRow
                    user={user}
                    onInactivate={() => updater(user)}
                  />
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
