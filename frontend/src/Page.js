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

export default function Page() {
    return (
        <Router>
            <div className="container p-0">
                <Header />
                <Menu />
            </div>

            <hr />

            <Switch>
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
                    <Worksheet />
                </Route>
                <Route path='/'>
                    <Redirect to='/partners' />
                </Route>
            </Switch>
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

function Worksheet() {
    return (
        <div>
            <h2>Munkalapok</h2>
        </div>
    );
}
