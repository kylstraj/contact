import {
  INVITATION_ACCEPTED,
  INVITATION_REJECTED,
  INVITATION_SENT,
  INVITATIONS_FETCHED,
  START_FETCH_INVITATIONS,
  START_RESPOND_TO_INVITATION,
  START_SEND_INVITE,
} from '../actions/actions';
import { immutPush, immutAssign } from '../utils/immut';
  

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
          invitations: Object.assign(
            {},
            state.invitations,
            {
              received: state.invitations.received.filter(inv => 
                inv.inviter.username !== action.inviter
              ),
            }
          ),
        },
      );
    case INVITATION_REJECTED:
      return Object.assign(
        {},
        state,
        {
          invitations: Object.assign(
            {},
            state.invitations,
            {
              received: state.invitations.received.filter(inv => 
                inv.inviter.username !== action.inviter
              ),
            }
          ),
        },
      );
    case INVITATION_SENT:
      return Object.assign(
        {},
        state,
        {
          invitations: Object.assign(
            {},
            state.invitations,
            {
              made: immutPush(state.invitations.made, action.invitation),
            }
          ),
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
