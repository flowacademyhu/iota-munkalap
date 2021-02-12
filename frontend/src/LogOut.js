import React from "react";
import useToken from './hooks/useToken'

export default function LogOut() {

    const {token, setToken} = useToken();

    function logout() {
        sessionStorage.clear('acces_token');
        setToken("")
        window.location.reload();
    };

    return <span onClick={() => logout()}>Kijelentkezés</span>;
};