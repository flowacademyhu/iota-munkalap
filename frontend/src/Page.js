import React from "react";
import logo from './img/uj_logo.png';
import tools from './img/tools.png';
import MenuItem from './Menu-item';
import TableListOfEmployees from './employees/TableListOfEmployees';
import CreateEmployee from './employees/CreateEmployee';
import UpdateEmployee from './employees/UpdateEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export default function Page() {
    return (

        <Router>
            <div className="d-flex justify-content-around">
                <img src={logo} alt="ingo stop logo" width="135" height="49" />
                <MenuItem name="Munkavállalók" link="/employees" />
                <MenuItem name="Partnerek" link="/partners" />
                <MenuItem name="Munkalapok" link="/worksheets" />
                <img src={tools} alt="ingo stop logo" width="49" height="49" />
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
