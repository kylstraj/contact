import React from 'react';
import { Field, reduxForm } from 'redux-form';
import MessageField from '../MessageField';

let RegisterForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Your Credentials</legend>
        <p>
          <label htmlFor='username'>Username: </label>
          <Field name='username' component='input' type='text'/>
        </p>
        <p>
          <label htmlFor='password'>Password: </label>
          <Field name='password' component='input' type='password'/>
        </p>
        <p>
          <label htmlFor='confirmPassword'>Confirm Password: </label>
          <Field name='confirmPassword' component='input' type='password'/>
        </p>
      </fieldset>
      <fieldset>
        <legend>Your Info</legend>
        <p>
          <label htmlFor='name'>Your name: </label>
          <Field name='name' component='input' type='text'/>
        </p>
        <p>
          <label htmlFor='email'>Your email: </label>
          <Field name='email' component='input' type='text'/>
        </p>
        <p>
          <label htmlFor='phone'>Your phone number: </label>
          <Field name='phone' component='input' type='text'/>
        </p>
        <p>
          <label htmlFor='address'>Your address: </label>
          <Field name='address' component='input' type='text'/>
        </p>
      </fieldset>
      <button type='submit'>Register</button>
    </form>
  );
};

RegisterForm = reduxForm({
  form: 'register',
})(RegisterForm);

const Register = ({onRegisterClick, message, inProgress}) => (
  <div>
    <RegisterForm onSubmit={
      data => onRegisterClick(
        data.username, 
        data.password, 
        data.confirmPassword, 
        data.name,
        data.email, 
        data.phone, 
        data.address
      )
    }/>
    <MessageField message={message}/>
  </div>
);

export default Register;
