import React from 'react'

function Button({text, className, ...props}) {
  return (
    <button className=
      {className 
        ? `rounded bg-success text-light my-3 mx-5 ${className}`
        :`rounded bg-success text-light my-3 mx-5`
      }
    {...props}
    >
      {text}
      </button>
  );
}

export default Button;
