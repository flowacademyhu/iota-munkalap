import React from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function Page() {
    return (
        //ToDo:
        //IF Loged in -> Page.js else Login.js 
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/employee">Munkavállalók</Link>
                    </li>
                    <li>
                        <Link to="/partners">Partnerek</Link>
                    </li>
                    <li>
                        <Link to="/worksheet">Munkalapok</Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>

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
            </div>
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
