import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveEmployee from './SaveEmployee';
import './style.css';
import TableListOfEmployees from './employees/TableListOfEmployees';

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path='/addemployee'>
          <SaveEmployee />
        </Route>
        <Route path=''>
          <div className="border border-secondary">
            <div className="container-fluid">
              <TableListOfEmployees />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}