import React, { Component } from 'react'

const User = ({ user }) => (
  <li>
    { user.firstName } { user.lastName }
    <ul>
      <li>{ user.email }</li>
      <li>{ user.phone }</li>
      <li>{ user.address }</li>
    </ul>
  </li>
);

const userDataToComps = userData => 
  userData.map((datum, idx) => <User key={ idx } user={ datum } />);

const Users = ({ users }) => (
  <div>
    <h2>Users:</h2>
    <ul>
      { userDataToComps(users) }
    </ul>
  </div>
);

export default Users;
