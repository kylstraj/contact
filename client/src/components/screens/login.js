import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../shared/Button';
import TextField from '@material-ui/core/TextField';
import renderTextField from '../../utils/renderTextField';

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
      <div>
        <Field name='username' type='text' label='Username' component={renderTextField}/>
      </div>
      <div>
        <Field name='password' type='password' label='Password' component={renderTextField}/>
      </div>
      <Button variant='contained' color='primary' type='submit'>Login</Button>
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
