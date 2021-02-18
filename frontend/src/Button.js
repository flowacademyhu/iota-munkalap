import React from 'react'

function Button({text, moreClassName = '', ...props}) {
  return (
    <button className={`rounded bg-success text-light my-3 mx-2 border border-grey ${moreClassName}`}
    {...props}
    >
      {text}
      </button>
  );
}

export default Button;
