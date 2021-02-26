import React from 'react'
import EditButton from '../specialButtons/EditButton'
import { Link } from 'react-router-dom'
import Button from '../Button'

export default function EmployeeListRow({ employee, onInactivate }) {
  return (
    <tr key={employee.id}>
      <th scope="row">{employee.id}</th>
      <td>
        {employee.lastName} {employee.firstName}
      </td>
      <td>{employee.email}</td>
      <td>{employee.enabled ? 'Aktív' : 'Inaktív'}</td>
      <td>
        <div className="d-flex justify-content-around">
          {employee.enabled && (
            <Button
              onClick={onInactivate}
              type="button"
              className="btn btn-danger"
              text="Inaktiválás"
            />
          )}
          <Link to={`/employees/update/${employee.id}`}>
            <EditButton />
          </Link>
        </div>
      </td>
    </tr>
  )
}
