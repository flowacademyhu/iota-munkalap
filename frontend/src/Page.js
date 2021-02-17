import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import TableListOfEmployees from './employees/TableListOfEmployees';
import CreateEmployee from './employees/CreateEmployee';
import UpdateEmployee from './employees/UpdateEmployee';
import Header from './Header';
import Menu from './Menu';
import './style.css';
import TableListOfWorkSheets from './worksheets/TableListOfWorkSheets';

export default function Page() {
  return (
    <Router>
      <header>
        <div className="container p-0">
          <Header />
          <Menu />
        </div>
      </header>

      <main>
        <Switch>
          <div className="container p-0">
            <Route path='/employees/new'>
              <CreateEmployee />
            </Route>
            <Route path='/employees/update/:id'>
              <UpdateEmployee />
            </Route>
            <Route exact path="/employees">
              <TableListOfEmployees />
            </Route>
            <Route path="/partners">
              <Partners />
            </Route>
            <Route path="/worksheets">
              <TableListOfWorkSheets />
            </Route>
            <Route path='/'>
              <Redirect to='/partners' />
            </Route>
          </div>
        </Switch>
      </main>
    </Router>
  );
}

function Partners() {
  return (
    <div>
      <h2>Partnerek</h2>
    </div>
  );
}

