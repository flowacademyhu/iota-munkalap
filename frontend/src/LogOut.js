import React from "react";
import useToken from './hooks/useToken'

import {
    Redirect
} from "react-router-dom";


export default function LogOut() {

    const {token, setToken} = useToken();

    function logout() {
        sessionStorage.clear('acces_token');
        window.location.reload();

    };

    if (token === null) {
        return <Redirect to="/" push={true} />
    }

    return <span onClick={() => logout()}>Kijelentkezés</span>;
};