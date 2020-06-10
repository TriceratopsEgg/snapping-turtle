import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './Components/Login';
import Menu from './Containers/Menu';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/login" exact component={Login} />
        <Route path="/app" component={Menu} />   
      </div>
    </BrowserRouter>
  );
}

export default App;
