import { 
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_SCREEN, 
  SCREENS 
} from '../actions/actions';

const initialState = {
  credentials: {},
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
    default:
      return state;
  }
};

export default topLevelReducer;
