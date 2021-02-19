import React, { useState, useEffect, useCallback } from 'react'
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
      <select
        class="btn btn-success"
        onChange={(event) => handleInputChange(event)}
        name="filterEmployeebyActivity"
      >
        <option value="true">Aktív</option>
        <option value="false">Inaktív</option>
        <option value="">Mind</option>
      </select>
    </div>
  )
}

export default FilterUsers
