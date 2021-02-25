import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function FilterWorkSheets(props) {
  const { onStatusChange, status } = props

  const handleInputChange = (event) => {
    onStatusChange(event.target.value)
  }

  return (
    <div className="my-3">
      <form>
        <select
          value={status}
          className="btn btn-success"
          onChange={handleInputChange}
          name="filterWorkSheetByStatus"
        >
          <option value="CREATED">Létrehozott</option>
          <option value="REPORTED">Készre jelentett</option>
          <option value="CLOSED">Lezárt</option>
          <option value="">Mind</option>
        </select>
      </form>
    </div>
  )
}

export default FilterWorkSheets
