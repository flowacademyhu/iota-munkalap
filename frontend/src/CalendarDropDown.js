import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import hu from 'date-fns/locale/hu'
registerLocale('hu', hu)

function CalendarDropDown({ name, value, setFieldValue, placeholderText }) {
  return (
    <DatePicker
      locale="hu"
      selected={(value && new Date(value)) || null}
      onChange={(date) => setFieldValue(name, date)}
      dateFormat="yyyy.MM.dd"
      placeholderText={placeholderText}
      className="mr-2"
    />
  )
}

export default CalendarDropDown
