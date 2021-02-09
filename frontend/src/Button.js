import React from 'react'

function Button({ text, onClick, type }) {
  return (
    <button onClick={onClick} type={type} className='button'>{text}</button>
  );
}

export default Button;
