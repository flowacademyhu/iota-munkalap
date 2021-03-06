import React from 'react'
import { NavLink } from 'react-router-dom'
import useCurrentEmployee from './hooks/useCurrentEmployee'

function Menu() {
  const { isAdmin } = useCurrentEmployee()
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-success nav-justified p-0">
      <ul className="navbar-nav w-100">
        {isAdmin && (
          <li className="nav-item border border-white p-2">
            <NavLink
              className="nav-link font-weight-bold"
              activeClassName="active"
              to="/employees"
            >
              Munkavállalók
            </NavLink>
          </li>
        )}
        <li className="nav-item p-2 border border-white">
          <NavLink
            className="nav-link font-weight-bold"
            activeClassName="active"
            to="/worksheets"
          >
            Munkalapok
          </NavLink>
        </li>
        <li className="nav-item border border-white p-2">
          <NavLink
            className="nav-link font-weight-bold"
            activeClassName="active"
            to="/partners"
          >
            Partnerek
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
