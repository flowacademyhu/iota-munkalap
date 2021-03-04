import React from 'react'
import Select, { createFilter } from 'react-select'
import { useField } from 'formik'
export default function SearchSelect({ disabled, ...props }) {
  const [field, { touched, error }, { setValue, setTouched }] = useField(props)
  const { name, label, options, placeholder } = props
  const showError = touched && error
  const selectedValue = options.find((option) => option.value === field.value)
  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: 'any',
    stringify: (option) => `${option.label.replace(', a.sz.:', ' ')}`,
  }
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Select
        isDisabled={disabled}
        {...field}
        options={options}
        onChange={(option) => {
          setValue(option.value)
        }}
        filterOption={createFilter(filterConfig)}
        placeholder={placeholder}
        value={selectedValue}
        onBlur={() => setTouched(true)}
        className={`${showError ? 'is-invalid' : ''}`}
      />
      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
