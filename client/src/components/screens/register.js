import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../shared/Button';
import MessageField from '../MessageField';
import renderTextField from '../../utils/renderTextField';

let CredentialsForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
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
      <Button type='submit'>Next</Button>
    </form>
  );
};

CredentialsForm = reduxForm({
  form: 'registerCredentials',
})(CredentialsForm);

let InfoForm = props => {
  const { handleSubmit, onCancelClick } = props;
  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <Button type='submit'>Register</Button>
        <Button onClick={onCancelClick}>Cancel</Button>
      </div>
    </form>
  );
};

InfoForm = reduxForm({
  form: 'registerInfo',
})(InfoForm);

const RegisterForm = ({
  onCancelClick,
  onNextClick, 
  onRegisterClick, 
  message, 
  inProgress, 
  page, 
  username, 
  password,
}) => (
  page === 0
    ? (<div>
        <CredentialsForm onSubmit={
          data => onNextClick(
            data.username, 
            data.password, 
            data.confirmPassword, 
          )
        }/>
        <MessageField message={message}/>
      </div>)
    : (<div>
        <InfoForm onSubmit={
          data => onRegisterClick(
            username, 
            password, 
            data.name,
            data.email, 
            data.phone, 
            data.address
          )
        } onCancelClick={onCancelClick}/>
        <MessageField message={message}/>
      </div>));

export default RegisterForm;
