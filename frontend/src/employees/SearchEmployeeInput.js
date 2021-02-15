import React, { useState } from "react";

import Input from "../Input";
import { searchUser } from "../UserAPI";

export default function SearchEmployeeInput(props) {

    const [filter, setFilter] = useState("");

    function handleChange(event) {
        setFilter(event.target.value);
        searchUser(filter.toLowerCase());
        console.log(filter.toLowerCase())
    }

    return <Input value={filter} onChange={handleChange} type="text" placeholder="Keresés" {...props} />;
}