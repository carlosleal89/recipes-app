import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" />
      </Switch>
    </main>
  );
}

export default App;
