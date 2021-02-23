import React from 'react'
import { Switch } from 'react-router-dom'
import useCurrentUser from './hooks/useCurrentUser'
import RoutsOnlyForAdmin from './RoutsOnlyForAdmin'
import RoutsForEveryOne from './RoutsForEveryOne'

function Routing() {
  const { isAdmin } = useCurrentUser()
  return (
    <div className="col-12">
      <Switch>
        {isAdmin ? (
          <>
            <RoutsOnlyForAdmin />
            <RoutsForEveryOne />
          </>
        ) : (
          <RoutsForEveryOne />
        )}
      </Switch>
    </div>
  )
}

export default Routing
