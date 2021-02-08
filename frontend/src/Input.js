import React from 'react';

function Input({value, type, label}) {
  return (
    <div>
      <div>{label}</div>
      <input type={type} value={value} className='inputfield' />
    </div>
  );
}


export default Input;
