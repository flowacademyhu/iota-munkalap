import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function FilterWorkSheets(props) {
  const { status, onStatusChange } = props

  const handleInputChange = (event) => {
    console.log('filter', event.target.value)
    onStatusChange(event.target.value)
  }

  return (
    <div>
      <form>
        <select
          value={status}
          class="btn btn-success"
          onChange={handleInputChange}
          name="filterWorkSheetByStatus"
        >
          <option value="CREATED" label="Nyitott">
            Nyitott
          </option>
          <option value="REPORTED" label="Készre jelentett">
            Készre jelentett
          </option>
          <option value="CLOSED" label="Lezárt">
            Lezárt
          </option>
        </select>
      </form>
    </div>
  )
}

export default FilterWorkSheets
