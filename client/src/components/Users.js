import React, { Component } from 'react'

const User = ({ user }) => (
  <div>
    <h3> { user.firstName } { user.lastName } </h3>
    <dl>
      <dt>email</dt>
      <dd>{ user.email }</dd>
      <dt>phone</dt>
      <dd>{ user.phone }</dd>
      <dt>address</dt>
      <dd>{ user.address }</dd>
    </dl>
  </div>
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
