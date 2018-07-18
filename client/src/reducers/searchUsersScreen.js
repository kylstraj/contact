import {
  CONTACTS_FETCHED,
  INFO_SHARED,
  INVITATIONS_FETCHED,
  INVITATION_SENT,
  SET_SCREEN,
  START_SEARCH_USERS,
  START_SHARE_INFO,
  USERS_SEARCHED,
} from '../actions/actions';
import { immutPush, immutAssign } from '../utils/immut';

const initialState = {
  searchInProgress: false,
  searchResults: [],
  sharesInProgress: {},
  shareResults: {},
  requestsInProgress: {},
  requestsMade: {},
};

const searchUsersReducer = (state = initialState, action) => {
  let requestsMadeUpdate = {};
  switch (action.type) {
    case CONTACTS_FETCHED:
      const { sharees } = action;
      let shareResultUpdate = {};
      sharees.forEach(sharee => shareResultUpdate[sharee] = true);
      return Object.assign(
        {},
        state,
        {
          shareResults: shareResultUpdate,
        },
      );
    case INVITATIONS_FETCHED:
      const { invitations } = action;
      const { made } = invitations;
      made.forEach(inv => requestsMadeUpdate[inv.invitee.username] = true);
      return Object.assign(
        {}, 
        state,
        {
          requestsMade: requestsMadeUpdate,
        },
      );
    case INVITATION_SENT:
      return Object.assign(
        {},
        state,
        {
          requestsMade: immutAssign(
            state.requestsMade, 
            action.invitation.invitee.username, 
            true,
          ),
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
          sharesInProgress: immutAssign(
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
          sharesInProgress: immutAssign(
            state.sharesInProgress,
            action.contactUsername,
            false,
          ),
          shareResults: immutAssign(
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
