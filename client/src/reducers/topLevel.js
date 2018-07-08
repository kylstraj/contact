import { 
  CONTACTS_FETCHED,
  INFO_EDITED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTRATION_SUCCEEDED,
  SET_SCREEN, 
  START_EDIT_INFO,
  START_FETCH_CONTACTS,
  SCREENS 
} from '../actions/actions';

const initialState = {
  fetchingContacts: false,
  fieldsInFlux: {
    address: false,
    email: false,
    phone: false,
  },
  credentials: {},
  contacts: [],
  user: {},
  loggedIn: false,
  loginFlash: '',
  screen: SCREENS.HOME,
};

const topLevelReducer = function(state = initialState, action) {
  let fieldsInFluxUpdate = {};
  switch (action.type) {
    case SET_SCREEN:
      return Object.assign(
        {},
        state,
        {
          loginFlash: '',
          screen: action.screen,
        },
      );
    case INFO_EDITED:
      fieldsInFluxUpdate[action.field] = false;
      return Object.assign(
        {},
        state,
        {
          fieldsInFlux: Object.assign(
            {},
            state.fieldsInFlux,
            fieldsInFluxUpdate,
          ),
          user: action.user,
        },
      );
    case LOGIN_FAILURE:
      return Object.assign(
        {},
        state,
        {
          loginFlash: action.reason,
          screen: SCREENS.LOGIN,
        },
      );
    case LOGIN_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          loggedIn: true,
          loginFlash: '',
          credentials: action.credentials,
          screen: SCREENS.USER,
          user: action.user,
        },
      );
    case REGISTRATION_SUCCEEDED:
      return Object.assign(
        {},
        state,
        {
          loggedIn: true,
          loginFlash: '',
          credentials: action.credentials,
          screen: SCREENS.USER,
          user: action.user,
        },
      );
    case LOGOUT:
      return Object.assign(
        {},
        state,
        {
          contacts: [],
          credentials: {},
          loggedIn: false,
          screen: SCREENS.HOME,
          user: {},
        },
      );
    case START_EDIT_INFO:
      fieldsInFluxUpdate[action.field] = true;
      return Object.assign(
        {},
        state,
        {
          fieldsInFlux: Object.assign(
            {},
            state.fieldsInFlux,
            fieldsInFluxUpdate,
          ),
        },
      );
    case START_FETCH_CONTACTS:
      return Object.assign(
        {},
        state,
        {
          fetchingContacts: true,
        },
      );
    case CONTACTS_FETCHED:
      return Object.assign(
        {},
        state,
        {
          fetchingContacts: false,
          contacts: action.contacts,
        },
      );
    default:
      return state;
  }
};

export default topLevelReducer;
