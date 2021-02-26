import classNames from 'classnames'

function InputFeedback({ error }) {
  return error ? (
    <div className={classNames('input-feedback text-danger validationText')}>
      {error}
    </div>
  ) : null
}

function RadioInputGroup(props) {
  const { value, error, touched, label, className, children } = props
  const classes = classNames(
    'input-field',
    {
      'is-success': value || (!error && touched), // handle prefilled or user-filled
      'is-error': !!error && touched,
    },
    className
  )

  return (
    <div className={classes}>
      <fieldset>
        <legend className="inputStyle mb-4">{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  )
}

export default RadioInputGroup
