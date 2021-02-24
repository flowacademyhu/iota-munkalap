import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CalendarDropDown({ date, setDate }) {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      className="m-5"
    />
  )
}

export default CalendarDropDown
