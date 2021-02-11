import React from 'react';
import useUsers from '../hooks/useUsers';
import { Link } from 'react-router-dom';
import EditButton from '../EditButton';
import Button from '../Button';
import { putUserInactive } from '../UserAPI';

export default function TableListOfEmployees() {
  const { users } = useUsers();

  return (
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
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.active}</td>
                  <td>
                    <Link to={`/employees/update/${user.id}`}>
                      <EditButton />
                    </Link>
                  </td>
                  {user.isActive
                    ? <td className="d-flex justify-content-between">
                        Active
                        <Button
                        onClick={() => putUserInactive(user.id)}
                        type="button"
                        className="btn btn-danger"
                        text="Inaktiválás"
                        />

                    </td>
                    :
                    <td>Inactive</td>
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
  );
}