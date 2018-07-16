import {
  INVITATION_ACCEPTED,
  INVITATION_REJECTED,
  INVITATIONS_FETCHED,
  START_FETCH_INVITATIONS,
  START_RESPOND_TO_INVITATION,
} from '../actions/actions';
  

const initialState = {
  invitations: {
    made: [],
    received: [],
  },
};

const invitationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVITATION_ACCEPTED:
      return Object.assign(
        {},
        state,
        {
          invitations: state.invitations.filter(inv => inv.inviter.username !== action.inviter),
        },
      );
    case INVITATION_REJECTED:
      return Object.assign(
        {},
        state,
        {
          invitations: state.invitations.filter(inv => inv.inviter.username !== action.inviter),
        },
      );
    case INVITATIONS_FETCHED:
      return Object.assign(
        {},
        state,
        {
          invitations: action.invitations,
        }
      );
    default:
      return state;
  }
};

export default invitationsReducer;
