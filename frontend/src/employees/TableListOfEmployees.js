import React from 'react'
import { putUserInactive } from '../api/UserAPI'
import useUsers from '../hooks/useUsers'
import { Link } from 'react-router-dom'
import Button from '../Button'
import { putUserInactive } from '../api/UserAPI'
import SearchEmployeeInput from './SearchEmployeeInput'
import { Formik, Form } from 'formik'

export default function TableListOfEmployees() {
  const { users, keyword, setKeyword } = useUsers()

  async function updater(user) {
    await putUserInactive(user.id)
    const userNew = await getUsers()
    setUsers(userNew.data)
  }

  return (
    <>
      <div className="d-flex justify-content-between p-5">
        <span>
          <Link to={`/employees/new`}>
            <Button
              text="Új munkavállaló létrehozása"
              moreClassName="w-auto p-1"
            />
          </Link>
        </span>
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
                    key={user.id}
                    updater={() => updater(user)}
                  />
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
