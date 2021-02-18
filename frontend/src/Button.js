import React from 'react'

function Button({ text, moreClassName = '', ...props }) {
  return (
    <button
      className={`rounded bg-success text-light my-3 mx-5 ${moreClassName}`}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
