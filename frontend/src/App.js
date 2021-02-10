import LoginForm from './LoginForm';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SaveEmployee from './SaveEmployee';
import './style.css';
import TableListOfEmployees from './employees/TableListOfEmployees';
import useToken from './hooks/useToken';


export default function App() {

  const { token, setToken } = useToken();
  if (!token) {
    return <LoginForm setToken={setToken} />
  }

  return (
    <Router>
      <Switch>
        <Route path='/addemployee'>
          <SaveEmployee />
        </Route>
        <Route path='/employees'>
          <TableListOfEmployees />
        </Route>
      </Switch>
    </Router>
  );
}