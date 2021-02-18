import React from 'react'
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Header from './Header';
import Menu from './Menu';
import './style.css';
import Routing from './Routing';

export default function Page() {
  return (
    <Router>
      <header>
        <div className='col-12'>
          <Header />
          <Menu />
        </div>
      </header>
      <main>
        <Routing />
      </main>
    </Router>
  );
}
