import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import './App.scss';

const App = () => {
  const [isAuthenticated, setAuth] = useState(false);
  return (
    <div>
      {isAuthenticated ? (
        <Home />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
