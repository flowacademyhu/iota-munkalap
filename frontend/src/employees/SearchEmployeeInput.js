import React, { useState } from "react";

import Input from "../Input";
import { getUsers } from "../api/UserAPI";
import useUsers from "../hooks/useUsers";


export default function SearchEmployeeInput(props) {
    const { label, name, setForceRefresh, forceRefresh, refreshUsers } = props
    const [value, setValue] = useState("");

    function handleChange(event) {
        setValue(event.target.value)
        refreshUsers(event.target.value.toLowerCase());
        setForceRefresh(!forceRefresh)
    }

    return <Input value={value} onChange={event => handleChange(event)} type="text" placeholder="Keresés" name={name} label={label} />;
}