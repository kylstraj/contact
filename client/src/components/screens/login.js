import React from 'react';

const LoginScreen = () => (
  <form>
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

export default LoginScreen;
