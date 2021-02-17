import React from 'react';
import useUsers from '../hooks/useUsers';
import { Link } from 'react-router-dom';
import Button from '../Button';
import EmployeeListRow from './EmployeeListRow'

export default function TableListOfEmployees() {
  const { users } = useUsers();

  return (
    <>
      <Link to={`/employees/new`}>
        <Button text='Új munkavállaló létrehozása' />
      </Link>
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
                  <EmployeeListRow user={user}/>    
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