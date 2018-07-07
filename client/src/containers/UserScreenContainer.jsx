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
    user: state.main.user,
  }
);

const mapDispatchToProps = dispatch => (
  {    
    fetchContacts: (credentials) => {
      dispatch(startFetchContacts());
      return fetch('/api/user/contacts/verbose',
        {
          body: JSON.stringify({credentials}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .then(res => {
          dispatch(contactsFetched(res.contacts));
          return res.contacts;
        });
    },
    onEditButtonClick: field => dispatch(openEditInfoForm(field)),
    onSaveButtonClick: (field, value, credentials) => {
      dispatch(startEditInfo(field, value));
      dispatch(closeEditInfoForm(field));
      return fetch(`/api/user/update/${field}`,
        {
          body: JSON.stringify({credentials, value}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .then(user => {
          dispatch(infoEdited(user));
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
