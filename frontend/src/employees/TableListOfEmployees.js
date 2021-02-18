import React from 'react'
<<<<<<< HEAD
import { putUserInactive } from '../api/UserAPI'
import useUsers from '../hooks/useUsers'
import { Link } from 'react-router-dom'
import Button from '../Button'
import EmployeeListRow from './EmployeeListRow'
import { getUsers } from '../api/UserAPI'

export default function TableListOfEmployees() {
  const { users, setUsers } = useUsers()

  async function updater(user) {
    await putUserInactive(user.id)
    const userNew = await getUsers()
    setUsers(userNew.data)
  }
=======
import useUsers from '../hooks/useUsers'
import { Link } from 'react-router-dom'
import EditButton from '../EditButton'
import Button from '../Button'
import { putUserInactive } from '../api/UserAPI'

export default function TableListOfEmployees() {
  const { users } = useUsers()
>>>>>>> master

  return (
    <>
      <Link to={`/employees/new`}>
        <Button text="Új munkavállaló létrehozása" moreClassName="w-auto p-1" />
      </Link>
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
<<<<<<< HEAD
                  <EmployeeListRow
                    user={user}
                    key={user.id}
                    updater={() => updater(user)}
                  />
=======
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>
                      {user.lastName} {user.firstName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.enabled ? 'Aktív' : 'Inaktív'}</td>
                    <td className="d-flex justify-content-around align-items-center">
                      <Link to={`/employees/update/${user.id}`}>
                        <EditButton />
                      </Link>
                      {user.enabled && (
                        <Button
                          onClick={() => putUserInactive(user.id)}
                          type="button"
                          className="btn btn-danger w-auto"
                          text="Inaktiválás"
                        />
                      )}
                    </td>
                  </tr>
>>>>>>> master
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
