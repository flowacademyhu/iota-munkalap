import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CalendarDropDown({ date, setDate, placeholderText }) {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat="yyyy.MM.dd"
      disabledKeyboardNavigation
      placeholderText={placeholderText}
      className="mr-5 mb-5"
    />
  )
}

export default CalendarDropDown
