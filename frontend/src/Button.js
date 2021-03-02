import React from 'react'

function Button({ text, moreClassName = '', ...props }) {
  return (
    <button
      className={`rounded bg-success text-light mx-2 border border-grey ${moreClassName}`}
      {...props}
    >
      {text}
    </button>
  )
}

export default Button
