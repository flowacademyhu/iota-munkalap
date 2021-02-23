import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TableListOfEmployees from './employees/TableListOfEmployees'
import CreateEmployee from './employees/CreateEmployee'
import UpdateEmployee from './employees/UpdateEmployee'
import TableListOfWorkSheets from './worksheets/TableListOfWorkSheets'
import TableListofPartners from './partners/TableListofPartners'
import CreateWorkSheet from './worksheets/CreateWorkSheet'
import LoadingScreen from './LoadingScreen'

function Routing() {
  return (
    <div className="col-12">
      <Switch>
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
          <TableListofPartners />
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
          <Redirect to="/partners" />
        </Route>
      </Switch>
    </div>
  )
}

export default Routing

function UpdateWorkSheet() {
  return <LoadingScreen />
}
