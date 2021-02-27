import classNames from 'classnames'

// ne legyena arrow function,  usefield legyen a field, többit propsbol consttal szedem ki,
// mi az onchange,-> h lehessen változtatni,  onBlur? -> nincs jelentősége
function RadioInput(props) {
  const { field, id, label } = props
  const { name, value, onChange } = field

  return (
    <div className="ml-4">
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={onChange}
        className={classNames('radio-button mr-2')}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default RadioInput
