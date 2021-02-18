import React from 'react';
import logo from './img/uj_logo.png';
import tools from './img/tools.png';
import Dropdown from 'react-bootstrap/Dropdown';
import LogOut from './LogOut';
import UserData from './UserData';
import ToolsButton from './ToolsButton';

function Header() {
  return (
    <div className='my-3'>
      <div className='row align-items-center m-0'>
        <div className='col p-0'>
          <img className='col-auto logo p-0 m-0' src={logo} alt='ingo stop logo' />
        </div>

        <div className='col text-center h5 p-0'>
          <UserData />
        </div>

        <Dropdown className='col text-right p-0'>
          <Dropdown.Toggle className='bg-transparent border-light w-auto p-0' id='dropdown-basic'>
          <ToolsButton />
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
