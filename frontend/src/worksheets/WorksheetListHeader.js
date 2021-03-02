import React from 'react'
import { Link } from 'react-router-dom'
import StatusFilter from './StatusFilter'
import DateRangeFilter from './DateRangeFilter'
import Button from '../Button'

function WorksheetListHeader({
  startDate,
  onStartDate,
  endDate,
  onEndDate,
  status,
  onStatus,
}) {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-4 d-flex justify-content-center my-3">
          <Link to={`/worksheets/new`}>
            <Button text="Új munkalap létrehozása" moreClassName="w-auto p-1" />
          </Link>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-sm-6 d-flex flex-column align-items-center">
          <DateRangeFilter
            startDate={startDate}
            onStartDate={onStartDate}
            endDate={endDate}
            onEndDate={onEndDate}
          />
        </div>
        <div className="col-sm-4 d-flex flex-column align-items-center">
          <div>Szűrés állapot szerint:</div>
          <div>
            <StatusFilter status={status} onStatusChange={onStatus} />
          </div>
        </div>
      </div>
    </>
  )
}

export default WorksheetListHeader
