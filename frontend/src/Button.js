import React from 'react'

function Button({text, className, ...props}) {
  return (
    <button className={`rounded bg-success text-light my-3 mx-5 ${className}`}
    {...props}
    >
      {text}
      </button>
  );
}

export default Button;
