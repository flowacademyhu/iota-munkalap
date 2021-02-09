import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TableListOfEmployees() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
    const { data } = await axios(`https://jsonplaceholder.typicode.com/users`);
    setUser(data);
    }
    fetchData();
  }, [setUser]);
  return (
    <div className="border border-secondary">
      <div className="container-sm">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Név</th>
              <th scope="col">E-mail</th>
              <th scope="col">Aktiv</th>
            </tr>
          </thead>
          <tbody>
          {user ? (
            user.map(user => (
              <tr key={user.id}>
               <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.aktive}</td>
              </tr>
            ))
          )
          : <tr>
            <td>Loading...</td>
            </tr>
          }
            </tbody>
        </table>
      </div>
    </div>
  );
}