import React from 'react'
import { Route } from 'react-router-dom'
import useCurrentEmployee from './hooks/useCurrentEmployee'

function AdminRoute({ children, ...props }) {
  const { isAdmin } = useCurrentEmployee()
  return isAdmin ? <Route {...props}>{children}</Route> : null
}

export default AdminRoute
