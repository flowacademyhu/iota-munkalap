import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TableListOfEmployees from './employees/TableListOfEmployees'
import CreateEmployee from './employees/CreateEmployee'
import UpdateEmployee from './employees/UpdateEmployee'
import TableListOfWorkSheets from './worksheets/TableListOfWorkSheets'
import UpdateWorksheet from './worksheets/UpdateWorksheet'

function Routing() {
  return (
    <Switch>
      <div className="col-12">
        <Route path="/employees/new">
          <CreateEmployee />
        </Route>
        <Route path="/employees/update/:id">
          <UpdateEmployee />
        </Route>
        <Route exact path="/employees">
          <TableListOfEmployees />
        </Route>
        <Route path="/partners">
          <Partners />
        </Route>
        <Route path="/worksheets/update/:id">
          <UpdateWorksheet />
        </Route>
        <Route exact path="/worksheets">
          <TableListOfWorkSheets />
        </Route>
        <Route path="/">
          <Redirect to="/partners" />
        </Route>
      </div>
    </Switch>
  )
}

function Partners() {
  return (
    <div>
      <h2>Partnerek</h2>
    </div>
  )
}

export default Routing
