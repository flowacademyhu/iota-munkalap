import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TableOfMunkatarsak from './TableOfMunkatarsak';
import './App.css';

export default function App() {
  const [user, setUser] = useState();

 useEffect(async () => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    setUser(data);
  }, []);
  return (
    <div className="App">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Név</th>
      <th scope="col">E-mail</th>
      <th scope="col">Aktiv</th>
    </tr>
  </thead>
  {user ? (
            user.map(user => (
              <TableOfMunkatarsak user={user} key={user.id} />
            ))
          ) : (
            <>Users are loading...</>
          )}
</table>
    </div>
  );
}