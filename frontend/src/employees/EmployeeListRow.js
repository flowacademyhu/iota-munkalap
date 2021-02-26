import React from 'react'
import EditButton from '../specialButtons/EditButton'
import InactivateButton from '../specialButtons/InactivateButton'
import ActivateButton from '../specialButtons/ActivateButton'
import { Link } from 'react-router-dom'

export default function EmployeeListRow({
  employee,
  onInactivate,
  onActivate,
}) {
  return (
    <tr key={employee.id}>
      <th scope="row">{employee.id}</th>
      <td>
        {employee.lastName} {employee.firstName}
      </td>
      <td>{employee.email}</td>
      <td>{employee.enabled ? 'Aktív' : 'Inaktív'}</td>
      <td>
        <div>
          <Link to={`/employees/update/${employee.id}`}>
            <EditButton />
          </Link>
          {employee.enabled ? (
            <InactivateButton onClick={onInactivate} />
          ) : (
            <ActivateButton onClick={onActivate} />
          )}
        </div>
      </td>
    </tr>
  )
}
