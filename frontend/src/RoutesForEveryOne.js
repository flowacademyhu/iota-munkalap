import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TableListOfWorkSheets from './worksheets/TableListOfWorkSheets'
import TableListofPartners from './partners/TableListofPartners'
import CreateWorkSheet from './worksheets/CreateWorkSheet'
import LoadingScreen from './LoadingScreen'

function RoutesForEveryOne() {
  return (
    <>
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
    </>
  )
}

function UpdateWorkSheet() {
  return <LoadingScreen />
}

export default RoutesForEveryOne
