import React from 'react'
import { Switch } from 'react-router-dom'
import useCurrentUser from './hooks/useCurrentUser'
import RoutesOnlyForAdmin from './RoutesOnlyForAdmin'
import RoutesForEveryOne from './RoutesForEveryOne'

function Routing() {
  const { isAdmin } = useCurrentUser()
  return (
    <div className="col-12">
      <Switch>
        {isAdmin && <RoutesOnlyForAdmin />}
        <RoutesForEveryOne />
      </Switch>
    </div>
  )
}

export default Routing
