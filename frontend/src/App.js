import LoginForm from './LoginForm';
import React from "react";
import './style.css';
import useToken from './hooks/useToken';
import './App.css';
import Page from './Page';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const { token, setToken } = useToken();
  if (!token) {
    return <LoginForm setToken={setToken} />
  }

  return (
    <Page/>
  );
}

export default App;
