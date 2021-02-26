import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { statusTranslation } from './TranslationForWorkSheet'

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
          <option value="CREATED">{statusTranslation['CREATED']}</option>
          <option value="REPORTED">{statusTranslation['REPORTED']}</option>
          <option value="CLOSED">{statusTranslation['CLOSED']}</option>
          <option value="">{statusTranslation['ALL']}</option>
        </select>
      </form>
    </div>
  )
}

export default FilterWorkSheets
