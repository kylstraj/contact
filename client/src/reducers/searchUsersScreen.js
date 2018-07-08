import {
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
  shareResults: {},
};

const immutPush = (obj, key, val) => Object.assign(
  {},
  obj,
  {
    key: val,
  }
);

const searchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
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
          sharesInProgress: {},
          shareResults: {},
        }
      );
    default:
      return state;
  }
};

export default searchUsersReducer;
