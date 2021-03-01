import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function FilterEmployees(props) {
  const { status, onStatusChange } = props

  const handleInputChange = (event) => {
    if (event.target.value === 'true') {
      onStatusChange(true)
    } else if (event.target.value === 'false') {
      onStatusChange(false)
    } else {
      onStatusChange(null)
    }
  }

  return (
    <div>
      <form>
        <select
          value={status === null ? '' : status ? 'true' : 'false'}
          className="btn btn-success"
          onChange={handleInputChange}
          name="filterEmployeebyActivity"
        >
          <option value="true" label="Aktív">
            Aktív
          </option>
          <option value="false" label="Inaktív">
            Inaktív
          </option>
          <option value="" label="Mind">
            Mind
          </option>
        </select>
      </form>
    </div>
  )
}
