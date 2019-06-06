import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import './App.scss';

const App = () => {
  const [isAuthenticated] = useState(false);

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
