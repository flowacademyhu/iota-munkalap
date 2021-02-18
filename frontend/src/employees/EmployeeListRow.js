import React from 'react'
import EditButton from '../EditButton'
import { Link } from 'react-router-dom'
import Button from '../Button'

export default function EmployeeListRow({ user, updater }) {
  return (
    <tr key={user.id}>
      <th scope="row">{user.id}</th>
      <td>
        {user.lastName} {user.firstName}
      </td>
      <td>{user.email}</td>
      <td className="d-flex justify-content-between">
        {user.enabled ? (
          <>
            Aktív
          < Button
              onClick={updater}
              type="button"
              className="btn btn-danger"
              text="Inaktiválás"
            />
          </>
        ) : (
            <>
              Inaktív
          </>
          )}
        <Link to={`/employees/update/${user.id}`}>
          <EditButton />
        </Link>
      </td>
    </tr>
  )
}
