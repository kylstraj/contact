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
      onContactNavClick: (contact) => dispatch(
        setScreen(SCREENS.CONTACT, {contact}),
      ),
      'Home': () => dispatch(setScreen(SCREENS.HOME)),
      'Login': () => dispatch(setScreen(SCREENS.LOGIN)),
      'Register': () => dispatch(setScreen(SCREENS.REGISTER)),
      'About you': (user) => dispatch(setScreen(SCREENS.USER, {user})),
      'Logout': () => dispatch(logout()),
    },
    onLoginAttempts: {
      onLoginSuccess: ({username, password}, user) => dispatch(loginSuccess({username, password}, user)),
      onLoginFailure: (error) => dispatch(loginFailure(error)),
    },
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
  }
);

const ContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactView);

export default ContactContainer;
