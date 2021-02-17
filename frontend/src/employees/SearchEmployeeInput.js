import React, { useState } from "react";

import Input from "../Input";
import { getUsers } from "../api/UserAPI";

export default function SearchEmployeeInput(props) {
    const {label, name, setForceRefresh, forceRefresh, users} = props
    const [value, setValue] = useState("");

    function handleChange(event) {
        setValue(event.target.value)
        getUsers(event.target.value.toLowerCase());
        console.log(users)
        setForceRefresh(!forceRefresh)
    }

    return <Input value={value} onChange={event =>handleChange(event)} type="text" placeholder="Keresés" name={name} label={label} />;
}