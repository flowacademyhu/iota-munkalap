import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import hu from 'date-fns/locale/hu'
registerLocale('hu', hu)

function CalendarDropDown({ date, setDate, placeholderText, status }) {
  return (
    <DatePicker
      disabled={status}
      locale="hu"
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat="yyyy.MM.dd"
      placeholderText={placeholderText}
      className="mr-2"
    />
  )
}

export default CalendarDropDown
