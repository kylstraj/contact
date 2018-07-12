import {
  CONTACTS_FETCHED,
  INFO_SHARED,
  SET_SCREEN,
  START_SEARCH_USERS,
  START_SHARE_INFO,
  USERS_SEARCHED,
} from '../actions/actions';

const initialState = {
  searchInProgress: false,
  searchResults: [],
  sharesInProgress: {},
  shareResults: {

  },
};

const immutPush = (obj, key, val) => {
  let copy = {...obj};
  copy[key] = val;
  return copy;
}

const searchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTS_FETCHED:
      const contacts = action.contacts.map(contact => contact.username);
      let shareResultUpdate = {};
      contacts.forEach(contact => shareResultUpdate[contact] = true);
      return Object.assign(
        {},
        state,
        {
          shareResults: shareResultUpdate,
        },
      );
    case START_SEARCH_USERS:
      return Object.assign(
        {},
        state,
        {
          searchInProgress: true,
        }
      );
    case USERS_SEARCHED:
      return Object.assign(
        {},
        state,
        {
          searchInProgress: false,
          searchResults: action.users,
        }
      );
    case START_SHARE_INFO:
      return Object.assign(
        {},
        state,
        {
          sharesInProgress: immutPush(
            state.sharesInProgress,
            action.contactUsername,
            true,
          ),
        }
      );
    case INFO_SHARED:
      return Object.assign(
        {},
        state,
        {
          sharesInProgress: immutPush(
            state.sharesInProgress,
            action.contactUsername,
            false,
          ),
          shareResults: immutPush(
            state.shareResults,
            action.contactUsername,
            true,
          ),
        },
      );
    case SET_SCREEN:
      return Object.assign(
        {},
        state,
        {
          searchResults: [],
          sharesInProgress: {},
        }
      );
    default:
      return state;
  }
};

export default searchUsersReducer;
