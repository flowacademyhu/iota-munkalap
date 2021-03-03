import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import hu from 'date-fns/locale/hu'
registerLocale('hu', hu)

function CalendarDropDown({
  name,
  value,
  setFieldValue,
  placeholderText,
  setDate,
  date,
  status,
}) {
  return (
    <DatePicker
      disabled={status}
      locale="hu"
      selected={setFieldValue ? (value && new Date(value)) || null : date}
      onChange={
        setFieldValue
          ? (date) => setFieldValue(name, date)
          : (date) => setDate(date)
      }
      dateFormat="yyyy.MM.dd"
      placeholderText={placeholderText}
      className="mr-2"
    />
  )
}

export default CalendarDropDown
