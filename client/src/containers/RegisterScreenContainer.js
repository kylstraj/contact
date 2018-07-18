import { connect } from 'react-redux';
import Register from '../components/screens/register';
import {
  cancelRegistration,
  loginSuccess,
  loginFailure,
  nextRegPage,
  setScreen,
  startRegistrationAttempt,
  registrationSucceeded,
  registrationFailed,
  SCREENS,
} from '../actions/actions';
import apiFetch from '../utils/apiFetch';

const isUsernameViable = (username, cb) =>
  username.length <= 20
    ? apiFetch(`api/username/${username}`)
      .then(res => {
        console.log(res);
        if (res.exists) {
          cb(false, 'That username already exists')
        } else {
          cb(true);
        }
      })
    : cb(false, 'That username is too long');

const mapStateToProps = state => (
  {
    inProgress: state.registerScreen.inProgress,
    message: state.registerScreen.message,
    page: state.registerScreen.page,
    username: state.registerScreen.username,
    password: state.registerScreen.password,
  }
);

const mapDispatchToProps = dispatch => (
  {

    onNextClick: (username, password, confirm) => (
      password === confirm
        ? isUsernameViable(username, function(viable, message) {
            if (!viable) 
              return dispatch(registrationFailed(message));
            else
              return dispatch(nextRegPage(username, password));
          })
        : dispatch(registrationFailed('Passwords do not match'))),

    onRegisterClick: (
      username,
      password,
      name,
      email,
      phone,
      address,
    ) => {
      dispatch(startRegistrationAttempt());
      apiFetch('api/new_user', {
        username,
        password,
        name,
        email,
        phone,
        address,
      })
        .then(userOrError => {
          if (userOrError.errors) throw userOrError.errors;
          const user = userOrError;
          dispatch(registrationSucceeded({username, password}, user));
          apiFetch('/login', {username, password})
            .then(
              res => dispatch(loginSuccess({username, password}, res))
            );
        })
        .catch(errors => dispatch(registrationFailed(errors.join('; '))))
    },

    onCancelClick: () => {
      dispatch(cancelRegistration());
      dispatch(setScreen(SCREENS.HOME));
    },
  }
);

const RegisterScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export default RegisterScreenContainer;
