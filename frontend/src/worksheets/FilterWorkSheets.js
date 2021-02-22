import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function FilterWorkSheets(props) {
  const { workSheetStatus, onStatusChange } = props

  const handleInputChange = (event) => {
    onStatusChange(event.target.value)
  }

  return (
    <div>
      <form>
        <select
          value={workSheetStatus}
          class="btn btn-success"
          onChange={handleInputChange}
          name="filterWorkSheetByStatus"
        >
          <option value="created" label="Nyitott">
            Nyitott
          </option>
          <option value="reported" label="Készre jelentett">
            Készre jelentett
          </option>
          <option value="closed" label="Lezárt">
            Lezárt
          </option>
        </select>
      </form>
    </div>
  )
}

export default FilterWorkSheets
