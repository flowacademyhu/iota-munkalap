import React, { useState } from "react";

import {
    Redirect
} from "react-router-dom";


export default function LogOut({setToken}) {

    const [loggedOut, setLoggedOut] = useState(false);

    function logout() {
        sessionStorage.clear('acces_token');
        setLoggedOut(true);
        setToken("");

    };

    if (loggedOut) {
        return <Redirect to="/" push={true} />
    }

    return <span onClick={logout}>Kijelentkezés</span>;
};