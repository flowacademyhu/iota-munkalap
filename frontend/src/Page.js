import React from "react";
import logo from './uj_logo.png';
import tools from './tools.png';
import MenuItem from './Menu-item';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink, 
} from "react-router-dom";

export default function Page() {
    return (
        
        <Router>
            <div class="flex-container">
            <img src={logo} alt="ingo stop logo" width="135" height="49"/>
            <MenuItem name="Munkavállalók" link="./employee"/>
            <MenuItem name="Partnerek" link="./partners"/>
            <MenuItem name="Munkalapok" link="./worksheets"/>
            <img src={tools} alt="ingo stop logo" width="49" height="49"/>
            </div>
                <hr />


                <Switch>
                    <Route exact path="/employee">
                        <Employee />
                    </Route>
                    <Route path="/partners">
                        <Partners />
                    </Route>
                    <Route path="/worksheets">
                        <Worksheet />
                    </Route>
                </Switch>
         
        </Router>
    );
}

function Employee() {
    return (
        <div>
            <h2>Munkavállalók</h2>
        </div>
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
