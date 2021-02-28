import React from 'react'
import { Link } from 'react-router-dom'
import FilterWorkSheetsByStatus from './FilterWorkSheetsByStatus'
import FilterWorkSheetsByDate from './FilterWorkSheetsByDate'
import Button from '../Button'

function FiltersAndNewWorkSheet({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  status,
  setStatus,
}) {
  return (
    <>
      <div className="py-1">
        <Link to={`/worksheets/new`}>
          <Button text="Új munkalap létrehozása" moreClassName="w-auto p-1" />
        </Link>
      </div>
      <div className="d-flex flex-row justify-content-between">
        <FilterWorkSheetsByDate
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <div className="mr-2">
          <div>Szűrés állapot szerint:</div>
          <FilterWorkSheetsByStatus
            status={status}
            onStatusChange={setStatus}
          />
        </div>
      </div>
    </>
  )
}

export default FiltersAndNewWorkSheet
