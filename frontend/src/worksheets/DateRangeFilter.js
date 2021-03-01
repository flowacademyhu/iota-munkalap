import React from 'react'
import CalendarDropDown from '../CalendarDropDown'
import Button from '../Button'

function DateRangeFilter({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <>
      <div className="ml-2">
        <div>Szűrés dátum szerint:</div>
        <div>
          <CalendarDropDown
            date={startDate}
            setDate={setStartDate}
            placeholderText="Intervallum kezdete"
          />
          <CalendarDropDown
            date={endDate}
            setDate={setEndDate}
            placeholderText="Intervallum vége"
          />
          <Button
            text="Összes"
            onClick={() => {
              setStartDate(null)
              setEndDate(null)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default DateRangeFilter
