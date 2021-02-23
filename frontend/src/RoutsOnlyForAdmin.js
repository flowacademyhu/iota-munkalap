import React from 'react'
import { Route } from 'react-router-dom'
import TableListOfEmployees from './employees/TableListOfEmployees'
import CreateEmployee from './employees/CreateEmployee'
import UpdateEmployee from './employees/UpdateEmployee'

function RoutsOnlyForAdmin() {
  return (
    <>
      <Route path="/employees/new">
        <CreateEmployee />
      </Route>
      <Route path="/employees/update/:id">
        <UpdateEmployee />
      </Route>
      <Route exact path="/employees">
        <TableListOfEmployees />
      </Route>
    </>
  )
}

export default RoutsOnlyForAdmin
