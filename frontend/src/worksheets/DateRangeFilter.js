import React from 'react'
import CalendarDropDown from '../CalendarDropDown'
import Button from '../Button'

function DateRangeFilter({ startDate, onStartDate, endDate, onEndDate }) {
  return (
    <>
      <div>Szűrés dátum szerint:</div>
      <div className="row align-items-center">
        <div className="col-md-10 row">
          <div className="col-xl-5 mx-3 d-flex justify-content-center">
            <CalendarDropDown
              date={startDate}
              setDate={onStartDate}
              placeholderText="Intervallum kezdete"
            />
          </div>
          <div className="col-xl-5 mx-3 d-flex justify-content-center">
            <CalendarDropDown
              date={endDate}
              setDate={onEndDate}
              placeholderText="Intervallum vége"
            />
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center">
          <Button
            text="Összes"
            onClick={() => {
              onStartDate(null)
              onEndDate(null)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default DateRangeFilter
