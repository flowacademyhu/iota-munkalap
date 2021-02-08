import React from 'react';

function Input({ name, label, type, value }) {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input type={type} className='inputfield' />
    </div>
  );
}


export default Input;
