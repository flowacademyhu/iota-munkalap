import React, {useState} from 'react'
import { putUserInactive } from '../api/UserAPI';
import EditButton from '../EditButton';
import { Link } from 'react-router-dom';
import Button from '../Button';

export default function EmployeeListRow({user}) {

    const [isActive, setIsActive] = useState(true)

    function updater() {
        putUserInactive(user.id)
        setIsActive(false)
    }
    return (
        <tr key={user.id}>
        <th scope="row">{user.id}</th>
        <td>{user.lastName} {user.firstName}</td>
        <td>{user.email}</td>
        {user.enabled && isActive
          ? <td className="d-flex justify-content-between">
            Aktív
          <Link to={`/employees/update/${user.id}`}>
              <EditButton />
            </Link>
            <Button
              onClick={() => updater()}
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