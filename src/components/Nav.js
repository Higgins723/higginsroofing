import React from 'react';
import { deleteCookie } from '../utils';

const Nav = (props) => {
  const logout = () => {
    deleteCookie('token');
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="/">Higgins Roofing</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
        </ul>
        <ul className="navbar-nav navbar-right">
          <li className="nav-item mr-4">
            <span className="navbar-text text-light">{props.username}</span>
          </li>
          <li className="nav-item">
            <button onClick={logout} className="btn btn-danger">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;