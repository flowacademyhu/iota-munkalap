import React from "react";
import Button from 'react-bootstrap/Button';
import {NavLink} from "react-router-dom";

export default function MenuItem(props) {
    return (
    <NavLink to={props.link} activeClassName="selectedLink">
        <Button variant="success">{props.name}</Button>
    </NavLink>
    );

}