import React from 'react'
import { Route } from 'react-router-dom'
import useCurrentUser from './hooks/useCurrentUser'

function AdminRoute({ children, ...props }) {
  const { isAdmin } = useCurrentUser()
  return isAdmin ? <Route {...props}>{children}</Route> : null
}

export default AdminRoute
