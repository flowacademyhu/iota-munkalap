import React from 'react';

export default function Table({user}) {
    return (
        <>
            <tbody>
                <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.aktive}</td>
                </tr>
            </tbody>
        </>
    );
}