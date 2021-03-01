import React from 'react'
import EditButton from '../specialButtons/EditButton'
import InactivateButton from '../specialButtons/InactivateButton'
import ActivateButton from '../specialButtons/ActivateButton'
import { Link } from 'react-router-dom'

export default function EmployeeListRow({
  employee: { id, email, lastName, firstName, enabled },
  onInactivate,
  onActivate,
}) {
  return (
    <tr key={id}>
      <th scope="row">{id}</th>
      <td>
        {lastName} {firstName}
      </td>
      <td>{email}</td>
      <td>{enabled ? 'Aktív' : 'Inaktív'}</td>
      <td>
        <div>
          <Link to={`/employees/update/${id}`}>
            <EditButton />
          </Link>
          {enabled ? (
            <InactivateButton onClick={onInactivate} />
          ) : (
            <ActivateButton onClick={onActivate} />
          )}
        </div>
      </td>
    </tr>
  )
}
