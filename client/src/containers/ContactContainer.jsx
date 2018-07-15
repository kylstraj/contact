import React from 'react';
import { connect } from 'react-redux';
import { 
  contactsFetched,
  loginFailure,
  loginSuccess,
  logout,
  setScreen, 
  startFetchContacts,
  SCREENS,
} from '../actions/actions';
import ContactView from '../components/ContactView';

const mapStateToProps = (state, ownProps) => (
  {
    main: state.main,
    form: state.form,
    dev: ownProps.dev,
  }
);

const mapDispatchToProps = dispatch => (
  {
    clicks: {
      'Home': () => dispatch(setScreen(SCREENS.HOME)),
      'Contacts': () => dispatch(setScreen(SCREENS.CONTACTS)),
      'Log In': () => dispatch(setScreen(SCREENS.LOGIN)),
      'Register': () => dispatch(setScreen(SCREENS.REGISTER)),
      'Search Users': () => dispatch(setScreen(SCREENS.SEARCH)),
      'About you': (user) => dispatch(setScreen(SCREENS.USER, {user})),
      'Your Invitations': () => dispatch(setScreen(SCREENS.INVITATIONS)),
      'Log Out': () => {
        fetch('/api/user/logout',
          {
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
          .then(res => res.json())
          .then(res => dispatch(logout()));
      },
    },
    onLoginAttempts: {
      onLoginSuccess: (credentials, user) => {
        dispatch(loginSuccess(credentials, user));
        dispatch(startFetchContacts());
        return fetch('/api/user/contacts/verbose',
          {
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
          .then(res => res.json())
          .then(res => {
            dispatch(contactsFetched(res.contacts, res.sharees));
            return res.contacts;
          });
      },
      onLoginFailure: (error) => dispatch(loginFailure(error)),
    },
  }
);

const ContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactView);

export default ContactContainer;
