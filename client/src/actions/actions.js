export const CANCEL_REGISTRATION = 'CANCEL_REGISTRATION';
export const CLOSE_EDIT_INFO_FORM = 'CLOSE_EDIT_INFO_FORM';
export const CONTACTS_FETCHED = 'CONTACTS_FETCHED';
export const CONTACTS_SEARCHED = 'CONTACTS_SEARCHED';
export const FORM_FIELD_CHANGE = 'FORM_FIELD_CHANGE';
export const INFO_EDITED = 'INFO_EDITED';
export const INFO_SHARED = 'INFO_SHARED';
export const INVITATION_ACCEPTED = 'INVITATION_ACCEPTED';
export const INVITATION_REJECTED = 'INVITATION_REJECTED';
export const INVITATION_SENT = 'INVITATION_SENT';
export const INVITATIONS_FETCHED = 'INVITATIONS_FETCHED';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const NEXT_REG_PAGE = 'NEXT_REG_PAGE';
export const OPEN_EDIT_INFO_FORM = 'OPEN_EDIT_INFO_FORM';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const REGISTRATION_SUCCEEDED = 'REGISTRATION_SUCCEEDED';
export const SET_SCREEN = 'SET_SCREEN';
export const START_EDIT_INFO = 'START_EDIT_INFO';
export const START_SHARE_INFO = 'START_SHARE_INFO';
export const START_FETCH_CONTACTS = 'START_FETCH_CONTACTS';
export const START_FETCH_INVITATIONS = 'START_FETCH_INVITATIONS';
export const START_REGISTRATION_ATTEMPT = 'START_REGISTRATION_ATTEMPT';
export const START_RESPOND_TO_INVITATION = 'START_RESPOND_TO_INVITATION';
export const START_SEARCH_USERS = 'START_SEARCH_USERS';
export const START_SEND_INVITE = 'START_SEND_INVITE';
export const TOGGLE_CONTACT_OPEN = 'TOGGLE_CONTACT_OPEN';
export const USERS_SEARCHED = 'USERS_SEARCHED';

export const SCREENS = {
  CONTACTS: 'CONTACTS',
  HOME: 'HOME',
  INVITATIONS: 'INVITATIONS',
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  SEARCH: 'SEARCH',
  USER: 'USER',
};

export const cancelRegistration = () => (
  {
    type: CANCEL_REGISTRATION,
  }
);

export const closeEditInfoForm = field => (
  {
    field,
    type: CLOSE_EDIT_INFO_FORM,
  }
);

export const contactsFetched = (contacts, sharees) => (
  {
    contacts,
    sharees,
    type: CONTACTS_FETCHED,
  }
);

export const contactsSearched = contacts => (
  {
    contacts,
    type: CONTACTS_SEARCHED,
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

export const invitationAccepted = (inviter) => (
  {
    inviter,
    type: INVITATION_ACCEPTED,
  }
);

export const invitationRejected = (inviter) => (
  {
    inviter,
    type: INVITATION_REJECTED,
  }
);

export const invitationSent = (invitation) => (
  {
    invitation,
    type: INVITATION_SENT,
  }
);

export const invitationsFetched = (invitations) => (
  {
    invitations,
    type: INVITATIONS_FETCHED,
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

export const nextRegPage = (username, password) => (
  {
    password,
    type: NEXT_REG_PAGE,
    username,
  }
);

export const registrationFailed = (message) => (
  {
    message,
    type: REGISTRATION_FAILED,
  }
);

export const registrationSucceeded = (credentials, user) => (
  {
    credentials,
    type: REGISTRATION_SUCCEEDED,
    user,
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

export const startSendInvite = (invitee) => (
  {
    invitee,
    type: START_SEND_INVITE,
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

export const startFetchInvitations = () => (
  {
    type: START_FETCH_INVITATIONS,
  }
);

export const startRegistrationAttempt = () => (
  {
    type: START_REGISTRATION_ATTEMPT,
  }
);

export const startRespondToInvitation = (inviter) => (
  {
    inviter,
    type: START_RESPOND_TO_INVITATION,
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
