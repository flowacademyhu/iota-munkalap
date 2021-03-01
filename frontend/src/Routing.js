import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TableListOfEmployees from './employees/TableListOfEmployees'
import Employee from './employees/Employee'
import TableListOfWorkSheets from './worksheets/TableListOfWorkSheets'
import TableListofPartners from './partners/TableListofPartners'
import Worksheet from './worksheets/Worksheet'
import AdminRoute from './AdminRoute'

function Routing() {
  return (
    <div className="col-12">
      <Switch>
        <AdminRoute path="/employees/new">
          <Employee />
        </AdminRoute>
        <AdminRoute path="/employees/update/:id">
          <Employee />
        </AdminRoute>
        <AdminRoute exact path="/employees">
          <TableListOfEmployees />
        </AdminRoute>
        <Route path="/partners">
          <TableListofPartners />
        </Route>
        <Route path="/worksheets/new">
          <Worksheet />
        </Route>
        <Route path="/worksheets/update/:id">
          <Worksheet />
        </Route>
        <Route exact path="/worksheets">
          <TableListOfWorkSheets />
        </Route>
        <Route path="/">
          <Redirect to="/worksheets" />
        </Route>
      </Switch>
    </div>
  )
}

export default Routing
