import React from 'react';

const renderFields = (formName, fieldValues, onFieldUpdate) =>
  Object.keys(fieldValues).map(fieldName => (<p key={fieldName}>
      <label htmlFor={fieldName}>{fieldName}: </label>
      <input 
        name={fieldName} 
        value={fieldValues[fieldName]} 
        onChange={(event) => onFieldUpdate(fieldName, event.target.value)}></input>
    </p>));

/*
const Form = ({formName, fieldValues, onFieldUpdate}) => (
  <form>
    {renderFields(formName, fieldValues, onFieldUpdate)}
    <button type='submit'>Submit</button>
  </form>
);*/

const Form = props => <form>{props.children}</form>;

export default Form;
