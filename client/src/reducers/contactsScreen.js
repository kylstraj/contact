import { 
  CONTACTS_FETCHED,
  CONTACTS_SEARCHED,
  FILTER_CONTACTS,
  SET_SCREEN,
  TOGGLE_CONTACT_OPEN,
  SCREENS,
} from '../actions/actions';

const initialState = {
  contactsOpen: {},
  contactsDisplayed: [],
};

const contactsScreenReducer = (state = initialState, action) => {
  const { contactsOpen } = state;
  let contactsOpenUpdate = {};
  switch (action.type) {
    case CONTACTS_FETCHED:
      return Object.assign(
        {},
        state,
        {
          contactsDisplayed: action.contacts,
        },
      );
    case CONTACTS_SEARCHED:
      return Object.assign(
        {},
        state,
        {
          contactsDisplayed: action.contacts,
        },
      );
    case SET_SCREEN:
      if (action.screen === SCREENS.CONTACTS) {
        return Object.assign(
          {},
          state,
          {
            contactsDisplayed: action.data.contacts,
          }
        );
      } else {
        return state;
      }
    case TOGGLE_CONTACT_OPEN: 
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
