import React from 'react'
import CalendarDropDown from '../CalendarDropDown'
import Button from '../Button'

function DateRangeFilter({ startDate, onStartDate, endDate, onEndDate }) {
  return (
    <>
      <div className="ml-2">
        <div>Szűrés dátum szerint:</div>
        <div>
          <CalendarDropDown
            date={startDate}
            setDate={onStartDate}
            placeholderText="Intervallum kezdete"
          />
          <CalendarDropDown
            date={endDate}
            setDate={onEndDate}
            placeholderText="Intervallum vége"
          />
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
