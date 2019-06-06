import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import './App.scss';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const login = (d) => {
    setUserData(d);
    setAuthenticated(true);
  }

  return (
    <div>
      {isAuthenticated ? (
        <Home userData={userData} />
      ) : (
        <Login login={login} />
      )}
    </div>
  );
}

export default App;
