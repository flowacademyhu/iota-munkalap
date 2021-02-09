import React from 'react'

function Button({ text, onClick, type }) {
  return (
    <button className="rounded bg-success text-light" onClick={onClick} type={type}>{text}</button>
  );
}

export default Button;
