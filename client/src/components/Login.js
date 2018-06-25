import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <form action='/login' method='POST'>
        <p>
          <label for='username'>User Name: </label>
          <input name='username'></input>
        </p>
        <p>
          <label for='password'>Password: </label>
          <input name='password' type='password'></input>
        </p>
        <p><button type='submit'>Log In</button></p>
      </form>
    );
  }
}

export default Login;
