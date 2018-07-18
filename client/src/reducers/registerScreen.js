import {
  NEXT_REG_PAGE,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCEEDED,
  START_REGISTRATION_ATTEMPT,
} from '../actions/actions';

const initialState = {
  inProgress: false,
  message: '',
  page: 0,
  password: '',
  username: '',
};

const registerScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_REG_PAGE:
      return Object.assign(
        {},
        state,
        {
          message: '',
          page: 1,
          password: action.password,
          username: action.username,
        }
      );
    case START_REGISTRATION_ATTEMPT:
      return Object.assign(
        {},
        state,
        {
          inProgress: true,
          message: '',
        }
      );
    case REGISTRATION_FAILED:
      return Object.assign(
        {},
        state,
        {
          inProgress: false,
          message: action.message,
        }
      );
    case REGISTRATION_SUCCEEDED:
      return Object.assign(
        {},
        state,
        {
          inProgress: false,
          message: '',
          username: '',
          password: '',
          page: 0,
        });
    default:
      return state;
  }
};

export default registerScreenReducer;
