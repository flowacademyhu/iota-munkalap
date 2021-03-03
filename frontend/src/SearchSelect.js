import React from 'react'
import Select from 'react-select'
import { useField } from 'formik'

function SearchSelect({ status, ...props }) {
  const [field, { touched, error }, { setValue, setTouched }] = useField(props)
  const { name, label, options, placeholder } = props
  const showError = touched && error

  const selectedValue = options.find((option) => option.value === field.value)
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Select
        isDisabled={status}
        {...field}
        options={options}
        onChange={(option) => {
          setValue(option.value)
        }}
        placeholder={placeholder}
        value={selectedValue}
        onBlur={() => setTouched(true)}
        className={`${showError ? 'is-invalid' : ''}`}
      />
      {showError && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default SearchSelect
