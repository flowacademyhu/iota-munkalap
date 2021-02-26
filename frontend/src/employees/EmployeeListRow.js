import React from 'react'
import EditButton from '../specialButtons/EditButton'
import InactivateButton from '../specialButtons/InactivateButton'
import ActivateButton from '../specialButtons/ActivateButton'
import { Link } from 'react-router-dom'

export default function EmployeeListRow({ user, onInactivate }) {
  return (
    <tr key={user.id}>
      <th scope="row">{user.id}</th>
      <td>
        {user.lastName} {user.firstName}
      </td>
      <td>{user.email}</td>
      <td>{user.enabled ? 'Aktív' : 'Inaktív'}</td>
      <td>
        <div>
          <Link to={`/employees/update/${user.id}`}>
            <EditButton />
          </Link>
          {user.enabled ? (
            <InactivateButton onClick={onInactivate} />
          ) : (
            <ActivateButton />
          )}
        </div>
      </td>
    </tr>
  )
}
