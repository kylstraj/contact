import { connect } from 'react-redux';
import Register from '../components/screens/register';
import {
  loginSuccess,
  loginFailure,
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
    ) => {
      if (confirm === password) {
        dispatch(startRegistrationAttempt());
        fetch('api/new_user', {
          body: JSON.stringify({
            username,
            password,
            name,
            email,
            phone,
            address,
          }),
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
          .then(res => res.json())
          .then(userOrError => {
            if (userOrError.error) throw userOrError.error;
            const user = userOrError;
            dispatch(registrationSucceeded({username, password}, user));
            fetch('/login', {
              body: JSON.stringify({username, password}),
              credentials: 'include',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'POST'
            })
              .then(res => res.json())
              .then(
                res => dispatch(loginSuccess({username, password}, res))
              );
          })
          .catch(err => dispatch(registrationFailed(err)))
      } else {
        dispatch(registrationFailed('Passwords do not match'));
      }
    },
  }
);

const RegisterScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterScreenContainer;
