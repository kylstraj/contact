import React from 'react';
import { connect } from 'react-redux';
import { 
  loginFailure,
  loginSuccess,
  logout,
  setScreen, 
  SCREENS,
} from '../actions/actions';
import ContactView from '../components/ContactView';

const mapStateToProps = state => (
  {
    main: state.main,
    form: state.form,
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
    }
  }
);

const ContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactView);

export default ContactContainer;
