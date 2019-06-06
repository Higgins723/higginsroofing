import React, { useState, useEffect } from 'react';
import { getCookie, deleteCookie, setCookie } from './utils';
import axios from 'axios';
import { isEmpty } from 'lodash';
import Home from './components/Home';
import Login from './components/Login';
import './App.scss';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const verifyToken = (token) => {
    axios.post('https://higginsroofingapi.herokuapp.com/api/auth/jwt/verify/', {
      token: token
    })
      .then(response => {
        setAuthenticated(true);
        setUserData(response.data);
        setCookie('token', response.data.token, 7);
      })
      .catch(error => {
        deleteCookie('token');
        setUserData({});
        setAuthenticated(false);
      });
  }

  const login = (d) => {
    setUserData(d);
  }

  useEffect(() => {
    const token = getCookie('token');

    if (token.length > 0 && !isAuthenticated) {
      verifyToken(token);
    }

    if (!(isEmpty(userData)) && !isAuthenticated && token.length === 0) {
      verifyToken(userData.token);
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
