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
  const [loaded, setLoaded] = useState(false);

  const verifyToken = (token) => {
    axios.post('https://higginsroofingapi.herokuapp.com/api/auth/jwt/verify/', {
      token: token
    })
      .then(response => {
        setCookie('token', response.data.token, 7);
        setUserData(response.data);
        setAuthenticated(true);
      })
      .catch(error => {
        deleteCookie('token');
        setUserData({});
        setAuthenticated(false);
      })
      .finally(() => {
        setLoaded(true);
      });
  }

  const login = (d) => {
    setUserData(d);
  }

  useEffect(() => {
    const token = getCookie('token');

    // verify token if cookie exists with name token
    if (token.length > 0 && !isAuthenticated) {
      verifyToken(token);
    }

    // verify token if no cookie but user data was set from login component
    if (!(isEmpty(userData)) && !isAuthenticated && token.length === 0) {
      verifyToken(userData.token);
    }

    // set loaded if not authenticated, no cookie, and user data is empty
    if (isEmpty(userData) && !isAuthenticated && token.length === 0) {
      setLoaded(true);
    }
  }, [loaded, userData, isAuthenticated])

  return (
    <div>
      {loaded ? (
        <div>
          {isAuthenticated ? (
            <Home userData={userData} />
          ) : (
            <Login login={login} />
          )}
        </div>
      ) : (
        <div className="text-center mx-auto">
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
