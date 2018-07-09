import {
  REGISTRATION_FAILED,
  START_REGISTRATION_ATTEMPT,
} from '../actions/actions';

const initialState = {
  inProgress: false,
  message: '',
};

const registerScreenReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default registerScreenReducer;
