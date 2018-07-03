export const FORM_FIELD_CHANGE = 'FORM_FIELD_CHANGE';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const SET_SCREEN = 'SET_SCREEN';

export const SCREENS = {
  CONTACT: 'CONTACT',
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  USER: 'USER',
};

export const formFieldChange = (form, field, value) => (
  {
    field,
    form,
    type: FORM_FIELD_CHANGE,
    value,
  }
);

export const loginFailure = (reason) => (
  {
    reason,
    type: LOGIN_FAILURE,
  }
);

export const loginSuccess = (credentials) => (
  {
    credentials,
    type: LOGIN_SUCCESS,
  }
);

export const logout = () => (
  {
    type: LOGOUT,
  }
);

export const setScreen = (screen, data = {}) => (
  {
    data,
    screen,
    type: SET_SCREEN,
  }
);
