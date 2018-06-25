import React, { Component } from 'react';

const Register = () => (
  <form action='/login' method='POST'>
    <p>
      <label for='username'>User Name: </label>
      <input name='username'></input>
    </p>
    <p>
      <label for='password'>Password: </label>
      <input name='password' type='password'></input>
    </p>
    <p>
      <label for='passwordAgain'>Confirm password: </label>
      <input name='passwordAgain' type='password'></input>
    </p>
    <p><button type='submit'>Register</button></p>
  </form>
);

export default Register;
