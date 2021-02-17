import React from 'react';
import logo from './img/uj_logo.png';
import tools from './img/tools.png';
import Dropdown from 'react-bootstrap/Dropdown';
import LogOut from './LogOut';

function Header() {
  return (
    <div className="container p-0 m-0">
      <div className='row align-items-center'>
        <div className='col text-left'>
          <img className="col-auto mt-3 ml-3 logo" src={logo} alt="ingo stop logo" />
        </div>

        <div className='col text-center h5'>
          <div>Super Admin</div>
          <div>superadmin@gmail.com</div>
        </div>

        <Dropdown className="col text-right">
          <Dropdown.Toggle className="bg-transparent border-light text-right w-50" id="dropdown-basic">
            <img src={tools} alt="ingo stop logo" className="settingsLogo" />
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
