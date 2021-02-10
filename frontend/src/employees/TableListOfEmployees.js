import React from 'react';
import useUsers from '../hooks/useUsers';
import Button from '../Button';
import { putUserInactive } from '../UserAPI';

export default function TableListOfEmployees() {
  const { users } = useUsers();

  return (
    <div className="border border-secondary">
      <div className="container-fluid">
        <table className="table">
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
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {user.isActive
                    ? <td className="d-flex justify-content-between">
                      Active
                        <Button
                        onClick={() => putUserInactive(user.id)}
                        type="button"
                        className="btn-close"
                        arialLabel="Close" />

                    </td>
                    :
                    <td>Inactive</td>}
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
  );
}