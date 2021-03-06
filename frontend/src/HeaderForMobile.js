import React from 'react'
import logo from './img/uj_logo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import LogOut from './LogOut'
import EmployeeData from './EmployeeData'
import ToolsButton from './ToolsButton'

function HeaderForMobile() {
  return (
    <>
      <div className="row my-2">
        <div className="col">
          <img
            className="col-auto logo p-0 m-0"
            src={logo}
            alt="ingo stop logo"
          />
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
      <div className="col text-center h5">
        <EmployeeData />
      </div>
    </>
  )
}

export default HeaderForMobile
