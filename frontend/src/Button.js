import React from 'react'

function Button({text, ...props}) {
  return (
    <button className='rounded bg-success text-light my-3 mx-5'
    {...props}
    >
      {text}
      </button>
  );
}

export default Button;
