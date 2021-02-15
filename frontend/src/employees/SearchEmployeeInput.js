import React, { useState } from "react";

import Input from "../Input";
import { searchUser } from "../UserAPI";

export default function SearchEmployeeInput(props) {

    const [value, setValue] = useState("");

    function handleChange(event) {
        searchUser(event.target.value.toLowerCase()); 
    }

    return <Input value={value} onChange={handleChange} type="text" placeholder="Keresés" {...props} />;
}