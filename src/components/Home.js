import React from 'react';
import Nav from './Nav';

const Home = (props) => {
  console.log(props.userData)
  return (
    <div>
      <Nav username={props.userData.user} />
    </div>
  );
}

export default Home;