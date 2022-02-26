import React from 'react';

function About({isAuth}) {
  console.log(isAuth);
  return <div>
    <h2>{isAuth}</h2>
  </div>;
}

export default About;
