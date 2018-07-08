export const CLOSE_EDIT_INFO_FORM = 'CLOSE_EDIT_INFO_FORM';
export const CONTACTS_FETCHED = 'CONTACTS_FETCHED';
export const FORM_FIELD_CHANGE = 'FORM_FIELD_CHANGE';
export const INFO_EDITED = 'INFO_EDITED';
export const INFO_SHARED = 'INFO_SHARED';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const OPEN_EDIT_INFO_FORM = 'OPEN_EDIT_INFO_FORM';
export const SET_SCREEN = 'SET_SCREEN';
export const START_EDIT_INFO = 'START_EDIT_INFO';
export const START_SHARE_INFO = 'START_SHARE_INFO';
export const START_FETCH_CONTACTS = 'START_FETCH_CONTACTS';
export const START_SEARCH_USERS = 'START_SEARCH_USERS';
export const TOGGLE_CONTACT_OPEN = 'TOGGLE_CONTACT_OPEN';
export const USERS_SEARCHED = 'USERS_SEARCHED';

export const SCREENS = {
  CONTACTS: 'CONTACTS',
  HOME: 'HOME',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  SEARCH: 'SEARCH',
  USER: 'USER',
};

export const closeEditInfoForm = field => (
  {
    field,
    type: CLOSE_EDIT_INFO_FORM,
  }
);

export const contactsFetched = (contacts) => (
  {
    contacts,
    type: CONTACTS_FETCHED,
  }
);

export const formFieldChange = (form, field, value) => (
  {
    field,
    form,
    type: FORM_FIELD_CHANGE,
    value,
  }
);

export const infoEdited = (field, user) => (
  {
    field,
    type: INFO_EDITED,
    user,
  }
);

export const infoShared = (contactUsername) => (
  {
    contactUsername,
    type: INFO_SHARED,
  }
);

export const loginFailure = (reason) => (
  {
    reason,
    type: LOGIN_FAILURE,
  }
);

export const loginSuccess = (credentials, user) => (
  {
    credentials,
    type: LOGIN_SUCCESS,
    user,
  }
);

export const logout = () => (
  {
    type: LOGOUT,
  }
);

export const openEditInfoForm = field => (
  {
    field,
    type: OPEN_EDIT_INFO_FORM,
  }
);

export const setScreen = (screen, data = {}) => (
  {
    data,
    screen,
    type: SET_SCREEN,
  }
);

export const startEditInfo = (field, value) => (
  {
    field,
    type: START_EDIT_INFO,
    value,
  }
);

export const startShareInfo = (contactUsername) => (
  {
    contactUsername,
    type: START_SHARE_INFO,
  }
);

export const startFetchContacts = () => (
  {
    type: START_FETCH_CONTACTS,
  }
);

export const startSearchUsers = () => (
  {
    type: START_SEARCH_USERS,
  }
);

export const toggleContactOpen = contact => (
  {
    contact,
    type: TOGGLE_CONTACT_OPEN,
  }
);

export const usersSearched = users => (
  {
    type: USERS_SEARCHED,
    users,
  }
);
