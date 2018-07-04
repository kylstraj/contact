import React from 'react';
import { Field, reduxForm } from 'redux-form';

let RegisterForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor='username'>Username: </label>
        <Field name='username' component='input' type='text'/>
      </p>
      <p>
      <p>
        <label htmlFor='password'>Password: </label>
        <Field name='password' component='input' type='password'/>
      </p>
        <label htmlFor='confirmPassword'>Confirm Password: </label>
        <Field name='confirmPassword' component='input' type='password'/>
      </p>
      <button type='submit'>Register</button>
    </form>
  );
};

RegisterForm = reduxForm({
  form: 'register',
})(RegisterForm);

const Register = () => (
  <RegisterForm onSubmit={() => true}/>
);

export default Register;
