import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';
import { Link } from 'react-router-dom';
import EditButton from '../EditButton';
import Button from '../Button';
import { putUserInactive } from '../UserAPI';
import FilterUsers from './FilterUsers'

export default function TableListOfEmployees() {
  const [name, setStatus] = useState("");
  const { users } = useUsers();

  return (
    <>
      <Link to={`/employees/new`}>
        <Button text='Új munkavállaló létrehozása' />
      </Link>
      <FilterUsers  status = {status} onStatusChange = {setStatus}/>
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
              {users ? (
                users.map(user => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    {user.isActive
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