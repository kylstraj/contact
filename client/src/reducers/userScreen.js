import {
  CLOSE_EDIT_INFO_FORM,
  OPEN_EDIT_INFO_FORM,
} from '../actions/actions';

const initialState = {
  editFormsOpen: {
    address: false,
    email: false,
    phone: false,
  },
}

const userScreenReducer = (state = initialState, action) => {
  let editFormsOpenUpdate = {};
  switch (action.type) {
    case CLOSE_EDIT_INFO_FORM:
      editFormsOpenUpdate[action.field] = false;
      return Object.assign(
        {},
        state,
        {
          editFormsOpen: Object.assign(
            {},
            state.editFormsOpen,
            editFormsOpenUpdate,
          ),
        },
      );
    case OPEN_EDIT_INFO_FORM:
      editFormsOpenUpdate[action.field] = true;
      return Object.assign(
        {},
        state,
        {
          editFormsOpen: Object.assign(
            {},
            state.editFormsOpen,
            editFormsOpenUpdate,
          ),
        },
      );
    default:
      return state;
  }
};

export default userScreenReducer;
