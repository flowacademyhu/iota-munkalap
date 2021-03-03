import React from 'react'
import { Link } from 'react-router-dom'
import { Tr, Th, Td } from 'react-super-responsive-table'
import EditButton from '../specialButtons/EditButton'
import InactivateButton from '../specialButtons/InactivateButton'
import ActivateButton from '../specialButtons/ActivateButton'

export default function EmployeeListRow({
  employee: { id, email, lastName, firstName, enabled },
  onInactivate,
  onActivate,
}) {
  return (
    <Tr key={id}>
      <Th scope="row">{id}</Th>
      <Td>
        {lastName} {firstName}
      </Td>
      <Td>{email}</Td>
      <Td>{enabled ? 'Aktív' : 'Inaktív'}</Td>
      <Td>
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
      </Td>
    </Tr>
  )
}
