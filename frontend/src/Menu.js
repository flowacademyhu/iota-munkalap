import React from 'react';
import MenuItem from './Menu-item';

function Menu() {
  return (
    <div className="container p-0">
      <div className='row align-items-center'>
        <div className="col"> <MenuItem name="Munkavállalók" link="/employees" /></div>
        <div className="col"><MenuItem name="Partnerek" link="/partners" /></div>
        <div className="col"><MenuItem name="Munkalapok" link="/worksheets" /></div>
      </div>
    </div>
  );
}

export default Menu;
