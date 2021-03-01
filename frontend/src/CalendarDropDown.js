import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CalendarDropDown({ name, value, setFieldValue, placeholderText }) {
  return (
    <DatePicker
      selected={(value && new Date(value)) || null}
      onChange={(date) => setFieldValue(name, date)}
      dateFormat="yyyy.MM.dd"
      placeholderText={placeholderText}
      className="mr-2 mb-5"
    />
  )
}

export default CalendarDropDown
