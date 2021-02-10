import React from 'react'

function Button({ text, onClick, type, className, arialLabel, disabled }) {
  return (
    <button 
    onClick={onClick} 
    disabled={disabled}
    type={type} 
    className={className} 
    aria-label={arialLabel}
    >
      {text}
      </button>
  );
}

export default Button;
