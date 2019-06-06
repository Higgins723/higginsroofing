import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import Home from './components/Home';
import Login from './components/Login';
import './App.scss';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const verifyToken = () => {
    axios.post('https://higginsroofingapi.herokuapp.com/api/auth/jwt/verify/', {
      token: userData.token
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        setUserData({});
        setAuthenticated(false);
      });
  }

  const login = (d) => {
    setUserData(d);
    setAuthenticated(true);
  }

  useEffect(() => {
    if (!(isEmpty(userData)) && isAuthenticated) {
      verifyToken();
    }
  })

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
