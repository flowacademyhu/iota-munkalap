import React from "react";
import logo from './img/uj_logo.png';
import tools from './img/tools.png';
import MenuItem from './Menu-item';
import TableListOfEmployees from './employees/TableListOfEmployees';
import CreateEmployee from './employees/CreateEmployee';
import UpdateEmployee from './employees/UpdateEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import LogOut from './LogOut';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Page() {

    return (

        <Router>

            <div className="row menu">
                <img className="col-auto mt-3 ml-3" src={logo} alt="ingo stop logo" width="135" height="49" />
                <div className="col">
                    <div className="row align-items-center h-100">
                        <div className="col-auto"> <MenuItem name="Munkavállalók" link="/employees" /></div>
                        <div className="col-auto"><MenuItem name="Partnerek" link="/partners" /></div>
                        <div className="col-auto"><MenuItem name="Munkalapok" link="/worksheets" /></div>
                    </div>
                </div>
                <div className="col-auto">
                    <Dropdown>
                        <Dropdown.Toggle className="bg-transparent border-light" id="dropdown-basic">
                            <img src={tools} alt="ingo stop logo" width="49" height="49"/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item><LogOut/></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
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
                <Route path='#/action-1'>
                    <LogOut />
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
