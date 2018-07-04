import React from 'react';
import { Field, reduxForm } from 'redux-form';
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
        ? onLoginSuccess({username, password}, res)
        : onLoginFailure(res.error)
    );
};

const onClickMaker = (username, password, onLoginAttempts) => (
  event => {
    event.preventDefault();
    loginAttempt(username, password, onLoginAttempts);
  }
);

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor='username'>Username: </label>
        <Field name='username' component='input' type='text'/>
      </p>
      <p>
        <label htmlFor='password'>Password: </label>
        <Field name='password' component='input' type='password'/>
      </p>
      <button type='submit'>Login</button>
    </form>
  );
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

const LoginScreen = ({onLoginAttempts}) => (
  <LoginForm onSubmit={data => loginAttempt(data.username, data.password, onLoginAttempts)}/>
);

export default LoginScreen;
