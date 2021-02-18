import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';
import { Link } from 'react-router-dom';
import EditButton from '../EditButton';
import Button from '../Button';
import { getUsers, putUserInactive } from '../api/UserAPI';
import SearchEmployeeInput from './SearchEmployeeInput';
import { Formik, Form } from "formik";


export default function TableListOfEmployees() {
  const { users, setUsers } = useUsers();
  const [forceRefresh, setForceRefresh] = useState(false)

  async function refreshUsers(path) {
    const response = await getUsers(path)
    setUsers(response.data)
  }

  return (
    <>
      <div className="d-flex justify-content-between p-5">
        <span>
          <Link to={`/employees/new`}>
            <Button className="h-auto" text='Új munkavállaló létrehozása' />
          </Link>
        </span>
        <Formik class="form-inline">
          <Form>
            <SearchEmployeeInput refreshUsers={refreshUsers} label="Munkatárs keresése" name="searchEmployee" setForceRefresh={setForceRefresh} forceRefresh={forceRefresh} users={users} />
          </Form>
        </Formik>
      </div>
      <div className="border border-secondary">
        <div className="container-fluid">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Név</th>
                <th scope="col">E-mail</th>
                <th scope="col">Státusz</th>
              </tr>
            </thead>
            <tbody>
              {users ? (
                users.map(user => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.lastName} {user.firstName}</td>
                    <td>{user.email}</td>
                    {user.enabled
                      ? <td className="d-flex justify-content-between">
                        Aktív
                      <Link to={`/employees/update/${user.id}`}>
                          <EditButton />
                        </Link>
                        <Button
                          onClick={() => putUserInactive(user.id)}
                          type="button"
                          className="btn btn-danger"
                          text="Inaktiválás"
                        />
                      </td>
                      :
                      <td className="d-flex justify-content-between">
                        Inaktív
                      <Link to={`/employees/update/${user.id}`}>
                          <EditButton />
                        </Link>
                      </td>
                    }
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