import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../shared/Button';
import MessageField from '../MessageField';
import renderTextField from '../../utils/renderTextField';

let RegisterForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Your Credentials</legend>
        <div>
          <Field autoComplete='off' label='Username' name='username' component={renderTextField} type='text'/>
        </div>
        <div>
          <Field autoComplete='off' label='Password' name='password' component={renderTextField} type='password'/>
        </div>
        <div>
          <Field autoComplete='off' label='Confirm Password' name='confirmPassword' component={renderTextField} type='password'/>
        </div>
      </fieldset>
      <fieldset>
        <legend>Your Info</legend>
        <div>
          <Field autoComplete='off' label='Your Name' name='name' component={renderTextField} type='text'/>
        </div>
        <div>
          <Field autoComplete='off' label='Your Email' name='email' component={renderTextField} type='text'/>
        </div>
        <div>
          <Field autoComplete='off' label='Your Phone Number' name='phone' component={renderTextField} type='text'/>
        </div>
        <div>
          <Field autoComplete='off' label='Your Mailing Address' name='address' component={renderTextField} type='text'/>
        </div>
      </fieldset>
      <Button type='submit'>Register</Button>
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
