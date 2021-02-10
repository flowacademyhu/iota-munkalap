import LoginForm from './LoginForm';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveEmployee from './employees/SaveEmployee';
import UpdateEmployee from './employees/UpdateEmployee';
import './style.css';
import TableListOfEmployees from './employees/TableListOfEmployees';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/employees/new'>
          <SaveEmployee />
        </Route>
        <Route path='/employees/update/:id'>
          <UpdateEmployee />
        </Route>
        <Route path='/employees'>
          <TableListOfEmployees />
        </Route>
        <Route path='/'>
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}