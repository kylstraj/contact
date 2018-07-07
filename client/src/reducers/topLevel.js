import { 
  CONTACTS_FETCHED,
  INFO_EDITED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_SCREEN, 
  START_FETCH_CONTACTS,
  SCREENS 
} from '../actions/actions';

const initialState = {
  fetchingContacts: false,
  credentials: {},
  contacts: [],
  user: {},
  loginFlash: '',
  screen: SCREENS.HOME,
};

const topLevelReducer = function(state = initialState, action) {
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
      return Object.assign(
        {},
        state,
        {
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
          credentials: {},
          screen: SCREENS.HOME,
          user: {},
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
