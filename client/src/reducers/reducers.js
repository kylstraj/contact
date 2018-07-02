import { 
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_SCREEN, 
  SCREENS 
} from '../actions/actions';

const initialState = {
  credentials: {},
  data: {},
  loginFlash: '',
  screen: SCREENS.HOME,
};

const contactApp = function(state = initialState, action) {
  switch (action.type) {
    case SET_SCREEN:
      return Object.assign(
        {},
        state,
        {
          data: action.data,
          screen: action.screen,
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
          credentials: action.credentials,
          screen: SCREENS.USER,
        },
      );
    case LOGOUT:
      return Object.assign(
        {},
        state,
        {
          credentials: {},
          screen: SCREENS.HOME,
        },
      );
    default:
      return state;
  }
};

export default contactApp;
