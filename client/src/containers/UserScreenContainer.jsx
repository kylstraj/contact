import React from 'react';
import { connect } from 'react-redux';
import {
  closeEditInfoForm,
  contactsFetched,
  infoEdited,
  openEditInfoForm,
  startEditInfo,
  startFetchContacts,
} from '../actions/actions';
import UserScreen from '../components/screens/user';

const mapStateToProps = state => (
  { 
    contacts: state.main.contacts,
    credentials: state.main.credentials,
    editFormsOpen: state.userScreen.editFormsOpen,
    fieldsInFlux: state.main.fieldsInFlux,
    user: state.main.user,
  }
);

const mapDispatchToProps = dispatch => (
  {    
    onEditButtonClick: field => dispatch(openEditInfoForm(field)),
    onSaveButtonClick: (field, value, credentials) => {
      dispatch(startEditInfo(field, value));
      dispatch(closeEditInfoForm(field));
      return fetch(`/api/user/${credentials.username}/update/${field}`,
        {
          body: JSON.stringify({value}),
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .then(user => {
          dispatch(infoEdited(field, user));
          return user;
        });
    },
  }
);

const UserScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserScreen);

export default UserScreenContainer;
