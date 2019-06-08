import React from 'react';
import { Route } from 'react-router-dom';
import Nav from './Nav';
import BidSheet from './BidSheet';
import Create from './Create';

const Home = (props) => {
  return (
    <div>
      <Nav username={props.userData.user} />

      <div className="container">
        <Route path="/" exact render={(routeProps) => (
            <BidSheet {...routeProps} userData={props.userData} />
          )}
        />
        <Route path="/create/" component={() => <Create userData={props.userData} />} />
      </div>
    </div>
  );
}

export default Home;