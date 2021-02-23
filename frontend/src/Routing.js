import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import TableListOfEmployees from './employees/TableListOfEmployees'
import CreateEmployee from './employees/CreateEmployee'
import UpdateEmployee from './employees/UpdateEmployee'
import TableListOfWorkSheets from './worksheets/TableListOfWorkSheets'
import TableListofPartners from './partners/TableListofPartners'
import CreateWorkSheet from './worksheets/CreateWorkSheet'
import LoadingScreen from './LoadingScreen'
import useCurrentUser from './hooks/useCurrentUser'

function Routing() {
  const { isAdmin } = useCurrentUser()
  return (
    <div className="col-12">
      <Switch>
        <Route path="/employees/new">
          {isAdmin ? <CreateEmployee /> : <Redirect to="/" />}
        </Route>
        <Route path="/employees/update/:id">
          {isAdmin ? <UpdateEmployee /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/employees">
          {isAdmin ? <TableListOfEmployees /> : <Redirect to="/" />}
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
