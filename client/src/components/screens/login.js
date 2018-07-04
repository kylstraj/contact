import React from 'react';
import store from '../../index';
import { loginSuccess, loginFailure } from '../../actions/actions';
import FormContainer from '../../containers/FormContainer';
import Form from '../Form';

const loginAttempt = (username, password, onLoginAttempts) => {
  const { onLoginSuccess, onLoginFailure } = onLoginAttempts;
  fetch(
    '/api/user',
    {
      body: JSON.stringify({credentials: {username, password}}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    .then(res => res.json())
    .then(
      res => res.address 
        ? onLoginSuccess({username, password})
        : onLoginFailure(res.error)
    );
};

const onClickMaker = (username, password, onLoginAttempts) => (
  event => {
    event.preventDefault();
    loginAttempt(username, password, onLoginAttempts);
  }
);

const LoginScreen = ({onLoginAttempts}) => (
  <FormContainer>
    <p>
      <label htmlFor='username'>username: </label>
      <input name='username'></input>
    </p>
  </FormContainer>
  /*
  <form>
    <p>
      <label htmlFor='username'>User Name: </label>
      <input name='username' id='username'></input>
    </p>
    <p>
      <label htmlFor='password'>Password: </label>
      <input name='password' type='password' id='password'></input>
    </p>
    <p>
      <button 
        type='submit' 
        onClick={onClickMaker(
          'abramowitza',
          'password',
          onLoginAttempts,
        )}>
        Log In
     </button>
    </p>
  </form>*/
);

export default LoginScreen;
