import { TOGGLE_CONTACT_OPEN } from '../actions/actions';

const initialState = {
  contactsOpen: {},
};

const contactsScreenReducer = (state = initialState, action) => {
  const { contactsOpen } = state;
  let contactsOpenUpdate = {};
  switch (action.type) {
    case (TOGGLE_CONTACT_OPEN): 
      contactsOpen[action.contact.username]
        ? contactsOpenUpdate[action.contact.username] = undefined
        : contactsOpenUpdate[action.contact.username] = true;
      return Object.assign(
        {},
        state,
        {
          contactsOpen: Object.assign(
            {},
            contactsOpen,
            contactsOpenUpdate,
          ),
        },
      );
    default:
      return state;
  }
};

export default contactsScreenReducer;