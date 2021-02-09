import React from "react";
import logo from './uj_logo.png';
import tools from './tools.png'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function Page() {
    return (
        
        <Router>
            <div class="flex-container">
            
            <img src={logo} alt="ingo stop logo" width="135" height="49"/>
            
            <div><Link to="/employee">Munkavállalók</Link></div>
            <div><Link to="/partners">Partnerek</Link></div>
            <div><Link to="/worksheet">Munkalapok</Link></div>
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
                    <Route path="/worksheet">
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
