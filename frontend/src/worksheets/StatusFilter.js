import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { statusTranslation } from './TranslationForWorkSheet'

function StatusFilter(props) {
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
          {Object.keys(statusTranslation).map((actualStatus) => (
            <option value={actualStatus} key={actualStatus}>
              {statusTranslation[actualStatus]}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}

export default StatusFilter
