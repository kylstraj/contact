import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

const loginAttempt = (username, password, onLoginAttempts) => {
  const { onLoginSuccess, onLoginFailure } = onLoginAttempts;
  fetch('/login', {
    body: JSON.stringify({username, password}),
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST'
  })
    .then(res => res.json())
    .then(
      res => res.username
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
      <Button variant='contained' color='secondary' type='submit'>Login</Button>
    </form>
  );
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

const LoginScreen = ({onLoginAttempts, loginFlash}) => (
  <div>
    <LoginForm onSubmit={data => loginAttempt(data.username, data.password, onLoginAttempts)}/>
    <p>{loginFlash}</p>
  </div>
);

export default LoginScreen;
