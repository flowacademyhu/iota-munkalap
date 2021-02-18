import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import logo from './img/uj_logo.png';
import tools from './img/tools.png';
import MenuItem from './Menu-item';
import TableListOfEmployees from './employees/TableListOfEmployees';
import CreateEmployee from './employees/CreateEmployee';
import UpdateEmployee from './employees/UpdateEmployee';
import './style.css';
import LogOut from './LogOut';
import TableListOfWorkSheets from './worksheets/TableListOfWorkSheets';

export default function Page() {

    return (

        <Router>

            <div className="row bg-light">
                <img className="col-auto mt-3 ml-3 logo" src={logo} alt="ingo stop logo" />
                <div className="col p-0">
                    <div className="row align-items-center h-100">
                        <div className="col p-0"> <MenuItem name="Munkavállalók" link="/employees" /></div>
                        <div className="col p-0"><MenuItem name="Partnerek" link="/partners" /></div>
                        <div className="col p-0"><MenuItem name="Munkalapok" link="/worksheets" /></div>
                    </div>
                </div>

                <Dropdown className="col-auto">
                    <Dropdown.Toggle className="bg-transparent border-light" id="dropdown-basic">
                        <img src={tools} alt="ingo stop logo" className="settingsLogo" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><LogOut /></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
                    <TableListOfWorkSheets />
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

