import React from 'react'
import logo from './img/uj_logo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import LogOut from './LogOut'
import EmployeeData from './EmployeeData'
import ToolsButton from './ToolsButton'

function Header() {
  return (
    <div className="my-3">
      <div className="row align-items-center flex-nowrap">
        <div className="col flex-shrink-0">
          <img
            className="col-auto logo p-0 m-0"
            src={logo}
            alt="ingo stop logo"
          />
        </div>

        <div className="col text-center h5 flex-shrink-1 text-truncate">
          <EmployeeData />
        </div>

        <Dropdown className="col text-right">
          <Dropdown.Toggle
            className="bg-transparent border-light w-auto p-0"
            id="dropdown-basic"
          >
            <ToolsButton />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <LogOut />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
