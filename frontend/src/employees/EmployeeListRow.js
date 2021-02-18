import React from 'react';
import EditButton from '../EditButton';
import { Link } from 'react-router-dom';
import Button from '../Button';

export default function EmployeeListRow({ user, updater }) {

  return (
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
            onClick={updater}
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
  )
}