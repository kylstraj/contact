import React from 'react';
import { connect } from 'react-redux';
import {
  formFieldChange,
} from '../actions/actions';
import Form from '../components/Form';

const mapStateToProps = (state, ownProps) => (
  {
    fieldValues: state.formsReducer[ownProps.formName],
    children: ownProps.children,
  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    onFieldUpdate: (fieldName, value) => 
      dispatch(formFieldChange(ownProps.formName, fieldName, value)),
  }
);

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

export default FormContainer;
