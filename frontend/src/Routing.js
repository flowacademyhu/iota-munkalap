import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TableListOfEmployees from './employees/TableListOfEmployees'
import CreateEmployee from './employees/CreateEmployee'
import UpdateEmployee from './employees/UpdateEmployee'
import TableListOfWorkSheets from './worksheets/TableListOfWorkSheets'
import TableListofPartners from './partners/TableListofPartners'
import CreateWorkSheet from './worksheets/CreateWorkSheet'
import UpdateWorkSheet from './worksheets/UpdateWorkSheet'
import AdminRoute from './AdminRoute'
import SelectPartner from './partners/SelectPartner'

function Routing() {
  return (
    <div className="col-12">
      <Switch>
        <AdminRoute path="/employees/new">
          <CreateEmployee />
        </AdminRoute>
        <AdminRoute path="/employees/update/:id">
          <UpdateEmployee />
        </AdminRoute>
        <AdminRoute exact path="/employees">
          <TableListOfEmployees />
        </AdminRoute>
        <Route path="/partners">
          <SelectPartner />
        </Route>
        <Route path="/worksheets/new">
          <CreateWorkSheet />
        </Route>
        <Route path="/worksheets/update/:id">
          <UpdateWorkSheet />
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
