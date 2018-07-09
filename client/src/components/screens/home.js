import React from 'react';

const testFetch = () => 
  fetch('api/user/contacts/verbose', {
    credentials: 'same-origin',
    method: 'POST',
  });

const HomeScreen = () => (
  <div>
    <h1>Welcome to Contact</h1>
    <h2>The thinking person's way to keep in touch</h2>
    <button onClick={testFetch}>test fetch</button>
  </div>
);

export default HomeScreen;
