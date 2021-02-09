import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GetingAndListingEmployees from './GetingAndListingEmployees';

export default function TableOfEmployees() {
  const [user, setUser] = useState();

 useEffect(async () => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    setUser(data);
  }, []);
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
  {user ? (
            user.map(user => (
              <GetingAndListingEmployees user={user} key={user.id} />
            ))
          ) : (
            <>Users are loading...</>
          )}
</table>
</div>
    </div>
  );
}