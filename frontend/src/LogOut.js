import React from "react";
import useToken from './hooks/useToken'

export default function LogOut() {

    const { token, setToken } = useToken();

    function logout() {
        setToken("")
        window.location.reload();
    };



    return <span onClick={logout}>Kijelentkezés</span>;
};