import React from 'react';

const Register = () => (
  <form>
    <p>
      <label htmlFor='username'>User Name: </label>
      <input name='username'></input>
    </p>
    <p>
      <label htmlFor='password'>Password: </label>
      <input name='password' type='password'></input>
    </p>
    <p>
      <label htmlFor='passwordAgain'>Confirm password: </label>
      <input name='passwordAgain' type='password'></input>
    </p>
    <p><button type='submit'>Register</button></p>
  </form>
);

export default Register;
