import React from 'react';
import './App.css';
import TableListOfEmployees from './employees/TableListOfEmployees';

export default function App() {

  return (
    <div className="border border-secondary">
      <div className="container-fluid">
      <TableListOfEmployees />
      </div>
    </div>
  );
}