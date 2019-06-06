import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSuccess = (response) => {
    setLoading(false);
    props.login(response.data);
  }

  const handleError = (error) => {
    setPassword('');
    setError(true);
    setLoading(false);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('https://higginsroofingapi.herokuapp.com/api/auth/jwt/', {
      username: email,
      password: password
    })
      .then(response => {
        handleSuccess(response);
      })
      .catch(error => {
        handleError(error);
      });
  }

  return (
    <div className="text-center login">
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          {hasError && <p className="text-danger">Username or password are incorrect</p>}
          <form onSubmit={onSubmit} className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label className="sr-only">Username</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} id="inputEmail" className="form-control" placeholder="Username" required />
            <label className="sr-only">Password</label>
            <input onChange={(e) => {setPassword(e.target.value); setError(false)}} value={password} type="password" id="inputPassword" className={"form-control " + (hasError ? "is-invalid" : "")} placeholder="Password" required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p className="mt-5 mb-3 text-muted">&copy; Higgins Roofing</p>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;