import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function FilterUsers(props) {
  const { status, onStatusChange } = props

  const handleInputChange = (event) => {
    onStatusChange(event.target.value)
    if (event === 'true') {
      event.target.value = true
    }
    if (event === 'false') {
      event.target.value = false
    } else {
      event.target.value = null
    }
  }

  return (
    <div>
      <form>
        <select
          class="btn btn-success"
          onChange={(event) => handleInputChange(event)}
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

export default FilterUsers
