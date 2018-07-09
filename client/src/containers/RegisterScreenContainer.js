import { connect } from 'react-redux';
import Register from '../components/screens/register';
import {
  startRegistrationAttempt,
  registrationSucceeded,
  registrationFailed,
} from '../actions/actions';

const mapStateToProps = state => (
  {
    inProgress: state.registerScreen.inProgress,
    message: state.registerScreen.message,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onRegisterClick: (
      username,
      password,
      confirm,
      name,
      email,
      phone,
      address,
    ) => alert(`attempting to register user ${username}`),
  }
);

const RegisterScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterScreenContainer;
