import React from 'react'
import { NavLink } from 'react-router-dom'
import useCurrentUser from './hooks/useCurrentUser'

function Menu() {
  const { isAdmin } = useCurrentUser();
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-success nav-justified mb-3 p-0">
      <ul className="navbar-nav w-100">
        {isAdmin && (
          <li className="nav-item border-right border-white p-2">
            <NavLink
              className="nav-link font-weight-bold"
              activeClassName="active"
              to="/employees"
            >
              Munkavállalók
            </NavLink>
          </li>
        )}
        <li className="nav-item p-2">
          <NavLink
            className="nav-link font-weight-bold"
            activeClassName="active"
            to="/worksheets"
          >
            Munkalapok
          </NavLink>
        </li>
        <li className="nav-item border-left border-white p-2">
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
