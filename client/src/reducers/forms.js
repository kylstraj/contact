import {
  FORM_FIELD_CHANGE,
} from '../actions/actions';

const initialState = {
  loginForm: {
    username: '',
    password: '',
  },
  registerForm: {
    username: '',
    password: '',
    confirmPassword: '',
  },
};

const formsReducer = function(state = initialState, action) {
  switch (action.type) {
    case FORM_FIELD_CHANGE:
      const update = {};
      update[action.form][action.field] = action.value;
      return Object.assign(
        {},
        state,
        update,
      );
    default:
      return state;
  }
}

export default formsReducer;
