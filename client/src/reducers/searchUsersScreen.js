import {
  START_SEARCH_USERS,
  USERS_SEARCHED,
} from '../actions/actions';

const initialState = {
  searchInProgress: false,
  searchResults: [],
};

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
    default:
      return state;
  }
};

export default searchUsersReducer;
