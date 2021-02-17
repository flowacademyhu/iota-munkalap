import React from 'react';
import logo from './img/uj_logo.png';
import tools from './img/tools.png';
import Dropdown from 'react-bootstrap/Dropdown';
import LogOut from './LogOut';
import GetUserData from './GetUserData';

function Header() {
  return (
    <div className='container px-0 py-2 m-0'>
      <div className='row align-items-center m-0'>
        <div className='col p-0'>
          <img className='col-auto logo p-0 m-0' src={logo} alt='ingo stop logo' />
        </div>

        <div className='col text-center h5 p-0'>
          <GetUserData />
        </div>

        <Dropdown className='col text-right p-0'>
          <Dropdown.Toggle className='bg-transparent border-light w-auto p-0' id='dropdown-basic'>
            <img src={tools} alt='ingo stop logo' className='settingsLogo m-0 float-right' />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item><LogOut /></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
