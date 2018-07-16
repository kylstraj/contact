import React from 'react';
import { connect } from 'react-redux';
import apiFetch from '../utils/apiFetch';
import ContactView from '../components/ContactView';
import { 
  contactsFetched,
  invitationsFetched,
  loginFailure,
  loginSuccess,
  logout,
  setScreen, 
  startFetchContacts,
  startFetchInvitations,
  SCREENS,
} from '../actions/actions';
import {
  updateContacts,
  updateInvitations,
} from '../actions/ajax';

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
      'Log Out': () => apiFetch('/api/user/logout').then(() => dispatch(logout())),
    },
    onLoginAttempts: {
      onLoginSuccess: (credentials, user) => {
        dispatch(loginSuccess(credentials, user));
        updateContacts(dispatch);
        updateInvitations(dispatch);
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
