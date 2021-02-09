import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SaveEmployee from './SaveEmployee';
import './style.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/addemployee'>
          <SaveEmployee />
        </Route>
        <Route path=''>
          <div>Munkavallalok listaja</div>
        </Route>
      </Switch>
    </Router>


  );
}

export default App;
